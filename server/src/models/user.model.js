import mongoose from "mongoose";
import crypto from "crypto";
import mongooseUniqueValidator from "mongoose-beautiful-unique-validation";
import validate from "mongoose-validator";

const emailValidator = [
  validate({
    validator: "isEmail",
    message: "Please enter valid email address ",
  }),
];

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: "First name is required",
    trim: true,
    maxlength: [15, "First name must be less than 15 characters"],
    match: [/^[A-Za-z\s]+$/, "Only letters are allowed in first name"],
  },
  lastName: {
    type: String,
    required: "Last name is required",
    trim: true,
    maxlength: [20, "Last name must be less than 20 characters"],
    match: [/^[A-Za-z\s]+$/, "Only letters are allowed in last name"],
  },
  email: {
    type: String,
    unique: "Email already exists.",
    required: "Email is required",
    validate: emailValidator,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
});

UserSchema.virtual("password").set(function (password) {
  (this._password = password),
    (this.salt = this.makeSalt()),
    (this.hashed_password = this.encryptPassword(password));
});

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 8) {
    this.invalidate("password", "Password must be at least 8 characters");
  }
}, null);

export default mongoose.model("User", UserSchema);
