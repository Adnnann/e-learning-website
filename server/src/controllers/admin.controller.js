/* eslint-disable no-underscore-dangle */
import _ from "lodash";
import { crossOriginResourcePolicy } from "helmet";
import User from "../models/user.model";
import Course from "../models/courses.model";
import dbErrorHandlers from "./helpers/dbErrorHandlers";
import errorHandler from "./helpers/dbErrorHandlers";
import courseController from "./course.controller";

const create = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      res.send({ error: errorHandler.getErrorMessage(err) });
    } else {
      res.send({ message: "Successfully created a new user." });
    }
  });
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.status(200).json(req.profile);
};

const remove = async (req, res, next) => {
  const userProfile = await User.findOne({ _id: req.profile._id });

  if (!userProfile.authenticate(req.body.password)) {
    return res.send({ error: "Incorrect old password" });
  }

  const user = req.profile;
  await User.findOneAndUpdate({ _id: req.profile._id }, { active: false });
};

const updateUserPassword = async (req, res, next) => {
  let user = req.profile;

  user = _.extend(user, req.body);

  const userProfile = await User.findOne({ _id: req.profile._id });

  if (!userProfile.authenticate(req.body.password)) {
    return res.send({ error: "Incorrect old password" });
  }
  user.hashed_password = null;
  user.password = req.body.newPassword;

  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.send({ error: errorHandler.getErrorMessage(err) });
    }
    return res.send({
      message: "Data updated",
      data: user,
    });
  });
};
const getCourses = (req, res) => {
  console.log(req.body);
  Course.find({ status: "active" }, (error, course) => {
    Object.values(req.users);
    let courses = [];

    course.map((item, index) => {
      const mentorName = `${
        Object.values(req.users).filter(
          (user) => user._id.toString() === item.mentorId
        )[0].firstName
      } ${
        Object.values(req.users).filter(
          (user) => user._id.toString() === item.mentorId
        )[0].lastName
      }`;
      course[index].mentorId = mentorName;
    });

    if (req.body.filterTerm) {
      courses = course.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(req.body.filterTerm.toLowerCase()) ||
          item.mentorId.toLowerCase().split(" ")[0] ===
            req.body.filterTerm.toLowerCase() ||
          item.mentorId.toLowerCase().split(" ")[1] ===
            req.body.filterTerm.toLowerCase()
      );

      return res.send({ data: courses, totalNumOfCourses: courses.length });
    }

    if (!req.body.filterLevel && !req.body.filterDuation) {
      courses = course.slice(req.body.firstValue, req.body.lastValue);
    } else if (req.body.filterLevel === "All levels") {
      if (req.body.filterDuration) {
        courses = course
          .filter(
            (item) =>
              (item.level === "Beginner Level" ||
                item.level === "Advanced Level" ||
                item.level === "Intermediate Level") &&
              item.duration.includes(req.body.filterDuration)
          )
          .slice(req.body.firstValue, req.body.lastValue);
      } else {
        courses = course
          .filter(
            (item) =>
              item.level === "Beginner Level" ||
              item.level === "Advanced Level" ||
              item.level === "Intermediate Level"
          )
          .slice(req.body.firstValue, req.body.lastValue);
      }
    } else if (req.body.filterLevel && req.body.filterDuration) {
      courses = course
        .filter(
          (item) =>
            item.duration.includes(req.body.filterDuration) &&
            item.level.includes(req.body.filterLevel)
        )
        .slice(req.body.firstValue, req.body.lastValue);
    } else if (req.body.filterLevel) {
      courses = course
        .filter((item) => item.level.includes(req.body.filterLevel))
        .slice(req.body.firstValue, req.body.lastValue);
    } else if (req.body.filterDuration) {
      courses = course
        .filter((item) => item.duration.includes(req.body.filterDuration))
        .slice(req.body.firstValue, req.body.lastValue);
    }

    if (error) {
      res.send({ error: dbErrorHandlers(error) });
    } else {
      res.send({
        data: courses,
        totalNumOfCourses: req.body.filterTerm
          ? course.filter(
              (item) =>
                item.title
                  .toLowerCase()
                  .includes(req.body.filterTerm.toLowerCase()) ||
                item.mentorId.toLowerCase().split(" ")[0] ===
                  req.body.filterTerm.toLowerCase() ||
                item.mentorId.toLowerCase().split(" ")[1] ===
                  req.body.filterTerm.toLowerCase()
            ).length
          : req.body.filterLevel === "All levels" && req.body.filterDuration
          ? course.filter(
              (item) =>
                (item.level === "Beginner Level" ||
                  item.level === "Advanced Level" ||
                  item.level === "Intermediate Level") &&
                item.duration.includes(req.body.filterDuration)
            ).length
          : req.body.filterLevel === "All levels"
          ? course.filter(
              (item) =>
                item.level === "Beginner Level" ||
                item.level === "Advanced Level" ||
                item.level === "Intermediate Level"
            ).length
          : req.body.filterLevel && req.body.filterDuration
          ? course.filter(
              (item) =>
                item.duration.includes(req.body.filterDuration) &&
                item.level.includes(req.body.filterLevel)
            ).length
          : req.body.filterLevel
          ? course.filter((item) => item.level.includes(req.body.filterLevel))
              .length
          : req.body.filterDuration
          ? course.filter((item) =>
              item.duration.includes(req.body.filterDuration)
            ).length
          : course.length,
      });
    }
  });
};

const getUsers = (req, res) => {
  User.find({}, (error, user) => {
    const users = user.slice(req.body.firstValue, req.body.lastValue);

    if (error) {
      res.send({ error: dbErrorHandlers(error) });
    } else {
      res.send({ data: users, totalNumOfUsers: user.length });
    }
  });
};

const getAllUsers = (req, res, next) => {
  User.find({}).exec((err, user) => {
    req.users = user;
    next();
  });
};

const removeCourse = async (req, res) => {
  const user = await Course.findByIdAndUpdate(
    { _id: req.course._id },
    { status: "inactive" }
  );

  if (user) {
    return res.send({ message: "Course removed" });
  }
};

const activateUserAccount = async (req, res, next) => {
  console.log(req.body);
  let user = await User.findById({ _id: req.profile._id });
  user = _.extend(user, req.body);
  user.active = req.body.userStatus;

  user.save((err, user) => {
    if (err) {
      return res.send({ error: errorHandler.getErrorMessage(err) });
    }
    return res.send({ message: "Profile activated" });
  });
};

const courseByID = (req, res, next, id) => {
  Course.findById(id).exec((err, course) => {
    if (err || !course) {
      return res.json({ error: "Course not found!" });
    }
    req.course = course;
    next();
  });
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};

export default {
  create,
  getUsers,
  read,
  removeCourse,
  updateUserPassword,
  getCourses,
  getAllUsers,
  activateUserAccount,
  courseByID,
  userByID,
};
