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

router.route("/admin/users").get(adminCtrl.getAllUsers);
//.post(userCtrl.create);

// router
//   .route("/api/users/:userId")
//   .get(userCtrl.read)
//   .put(userCtrl.update)
//   .delete(userCtrl.remove);

// router
//   .route("/api/users/updateUserPassword/:userId")
//   .put(userCtrl.updateUserPassword);

// router.param("userId", userCtrl.userByID);

export default router;
