import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import User from "../models/user.model";
import config from "../config/config";

const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.send({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.send({ error: "Email and password do not match" });
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      config.secret
    );
    res.cookie("userJwtToken", token, {
      expire: new Date() + 999,
      httpOnly: true,
    });
    res.send({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        nickname: user.nickname,
        email: user.email,
      },
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("userJwtToken");
  res.send({ message: "User signed out" });
};

const requireSignin = expressJwt({
  secret: config.secret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) return res.status(403).json("User is not authorized!");
  next();
};

export default { signin, signout, hasAuthorization, requireSignin };
