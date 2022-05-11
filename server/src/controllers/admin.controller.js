/* eslint-disable no-underscore-dangle */
import _ from "lodash";
import User from "../models/user.model";
import Course from "../models/courses.model";
import dbErrorHandlers from "./helpers/dbErrorHandlers";
import errorHandler from "./helpers/dbErrorHandlers";

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

const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);

  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res.send({ error: errorHandler.getErrorMessage(err) });
    }
    res.send({
      message: "Data updated",
      data: user,
      token: req.cookies.userJwtToken,
    });
  });
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

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};

const getCourses = (req, res) => {
  Course.find({}, (error, course) => {
    let courses = [];
    if (Math.ceil(course.length / 12 - req.body.page) === 0) {
      courses = course.slice(
        (Math.ceil(course.length / 12) - 1) * 12,
        course.length
      );
    } else {
      courses = course.slice(req.body.firstValue, req.body.lastValue);
    }

    if (error) {
      res.send({ error: dbErrorHandlers(error) });
    } else {
      res.send({ data: courses, totalNumOfCourses: course.length });
    }
  });
};

const getUsers = (req, res) => {
  User.find({}, (error, user) => {
    const users = user.slice(req.body.firstValue, req.body.lastValue);

    if (error) {
      res.send({ error: dbErrorHandlers(error) });
    } else {
      res.send({ data: users, totalNumOfCourses: user.length });
    }
  });
};

export default {
  create,
  getUsers,
  read,
  update,
  remove,
  updateUserPassword,
  getCourses,
  userByID,
};
