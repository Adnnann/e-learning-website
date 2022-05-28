import UserCourses from "../courses/UserCourses";
import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { getLoggedUserData } from "../../features/eLearningSlice";
import { useMediaQuery } from "@material-ui/core";
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
  dashboardTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    backgroundColor: "lightblue",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
}));

const DashboardRightPanel = () => {
  const classes = useStyles();
  const loggedUser = useSelector(getLoggedUserData);

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");

  return (
    <div className={classes.userDashboardMessage}>
      <Alert
        variant="filled"
        color="info"
        severity="info"
        style={{
          display: iPadAirScreen || iPadMiniScreen || surfaceDuo ? "none" : "",
        }}
        className={classes.dashboardTitle}
      >
        Courses - Your Current Courses and Progress
      </Alert>
      {loggedUser.user.role === "student" ? <UserCourses /> : null}
      {loggedUser.user.role === "mentor" ? <MentorCourses /> : null}
    </div>
  );
};

export default DashboardRightPanel;
