const mongoose = require("mongoose");

const CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: "Title must be unique",
    required: "Course title is required",
    match: [
      /^[a-zA-Z0-9\s]*$/,
      "Only letters and number are allowed for title",
    ],
    maxlength: [55, "Last name must be less than 55 characters"],
  },
  description: {
    type: String,
  },
  level: {
    type: String,
  },
  duration: {
    type: String,
  },
  courseImage: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  mentorId: {
    type: String,
    required: "Course must have an mentor",
  },
  status: {
    type: String,
    default: "active",
  },
  enrolledStudents: {
    type: Array,
  },
  updated: Date,
});

CoursesSchema.path("title").validate(async function (title) {
  const course = await this.constructor.findOne({ title });
  if (course) {
    if (this.id === course.id) {
      return true;
    }
    return false;
  }
  return true;
}, "Course title must be unique!");

const Course = mongoose.model("Courses", CoursesSchema);
module.exports = Course;
