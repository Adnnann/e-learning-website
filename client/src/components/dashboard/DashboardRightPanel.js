import UserCourses from "../courses/UserCourses";
import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { getLoggedUserData } from "../../features/eLearningSlice";
import MentorCourses from "../courses/MentorCourses";

const useStyles = makeStyles((theme) => ({
  userDashboardMessage: {
    width: "100%",
    fontSize: "40px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px",
      width: "100%",
    },
    marginTop: window.innerWidth === 820 ? "0px" : "50px",
  },
}));

const DashboardRightPanel = () => {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUserData);

  return (
    <div className={classes.userDashboardMessage}>
      <Alert
        variant="filled"
        color="info"
        severity="info"
        style={{
          fontSize: "20px",
          marginBottom: "20px",
          backgroundColor: "lightblue",
        }}
      >
        Courses - Your Current Courses and Progress
      </Alert>
      {loggedUser.user.role === "student" ? <UserCourses /> : null}
      {loggedUser.user.role === "mentor" ? <MentorCourses /> : null}
    </div>
  );
};

export default DashboardRightPanel;
