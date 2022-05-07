import _ from "lodash";
import User from "../models/user.model";
import errorHandler from "./helpers/dbErrorHandlers";

const create = (req, res, next) => {
  console.log(req);
  const user = new User(req.body);
  console.log(user);
  user.save((err, result) => {
    if (err) {
      res.send({ error: errorHandler.getErrorMessage(err) });
    } else {
      res.send({ message: "Successfuly created a new user." });
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
    res.send({ message: "Data updated" });
  });
};

const remove = (req, res, next) => {
  const user = req.profile;
  user.remove((err) => {
    if (err) {
      return res.status(400).send({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).send({ message: "Account closed" });
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
  read,
  update,
  remove,
  userByID,
};
