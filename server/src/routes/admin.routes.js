import express from "express";
import passport from "passport";
import adminCtrl from "../controllers/admin.controller";

require("../middleware/passport");

const router = express.Router();

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.cookies.userJwtToken) {
      res.send(JSON.stringify({ message: req.cookies.userJwtToken }));
    }
  }
);

router
  .route("/admin/courses")
  .post(adminCtrl.getAllUsers, adminCtrl.getCourses);

router.route("/admin/users").post(adminCtrl.getUsers);

router.route("/admin/course/:courseId").post(adminCtrl.removeCourse);

//.post(userCtrl.create);

// router
//   .route("/api/users/:userId")
//   .get(userCtrl.read)
//   .put(userCtrl.update)
//   .delete(userCtrl.remove);

// router
//   .route("/api/users/updateUserPassword/:userId")
//   .put(userCtrl.updateUserPassword);

router.param("courseId", adminCtrl.courseByID);

export default router;
