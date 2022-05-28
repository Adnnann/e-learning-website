import { useSelector } from "react-redux";
import {
  getCloseAccountFormStatus,
  getCourses,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
  getFilter,
  getLoggedUserData,
  getMentorCourses,
  getSelectedFilterTerm,
} from "../../features/eLearningSlice";
import { makeStyles } from "@mui/styles";
import { Grid } from "@material-ui/core";
import EditUserPassword from "../user/EditUserPassword";
import { Typography, useMediaQuery, Alert } from "@mui/material";
import CloseAccountForm from "../user/DeleteAccountForm";
import DeleteAccountModal from "../user/DeleteAccountModal";
import EditUserDataButtons from "./DashboardButtons";
import EditProfile from "../user/EditUserProfile";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import MentorCourses from "../courses/MentorCourses";

const useStyles = makeStyles((theme) => ({
  largeScreens: {
    marginTop: "20px",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  smallScreens: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  editProfileButtons: {
    marginTop: "40px",
    [theme.breakpoints.only("md")]: {
      marginLeft: "20px",
    },
  },
  dashboardTitle: {
    fontSize: "20px",
    marginBottom: "20px",
    backgroundColor: "lightblue",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  numberOfSelectedCourses: {
    textAlign: "left",
    marginLeft: "10px",
  },
  selectedTerm: {
    fontWeight: "900",
    textDecoration: "underline",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const editUserProfile = useSelector(getEditUserFormStatus);
  const editUserPassword = useSelector(getEditUserPasswordFormStatus);
  const closeAccount = useSelector(getCloseAccountFormStatus);
  const filterTerm = useSelector(getSelectedFilterTerm);
  const mentorCourses = useSelector(getMentorCourses);
  const courses = useSelector(getCourses);
  const loggedUser = useSelector(getLoggedUserData);

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");

  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Alert
          variant="filled"
          color="info"
          severity="info"
          className={classes.dashboardTitle}
        >
          Courses - Your Current Courses and Progress
        </Alert>
        {filterTerm ? (
          loggedUser.user.role === "mentor" && mentorCourses.data.length > 1 ? (
            <Typography
              variant="h5"
              className={classes.numberOfSelectedCourses}
            >
              There are {mentorCourses.data.length} results for the term{" "}
              <span className={classes.selectedTerm}>{filterTerm}</span>
            </Typography>
          ) : (
            <Typography
              variant="h5"
              className={classes.numberOfSelectedCourses}
            >
              There is {mentorCourses.data.length} result for the term{" "}
              <span className={classes.selectedTerm}>{filterTerm}</span>
            </Typography>
          )
        ) : null}
      </Grid>
      <Grid item xs={12} md={3} lg={3} xl={3}>
        <DashboardLeftPanel />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6} className={classes.smallScreens}>
        <DashboardRightPanel />
      </Grid>

      {!editUserProfile && !editUserPassword && !closeAccount ? (
        <Grid
          item
          xs={12}
          md={8}
          lg={8}
          xl={8}
          className={classes.largeScreens}
        >
          {!iPadAirScreen && !iPadMiniScreen && !surfaceDuo ? (
            <DashboardRightPanel />
          ) : null}
        </Grid>
      ) : (
        <>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            className={classes.smallScreens}
          >
            <EditUserDataButtons />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            {editUserProfile ? <EditProfile /> : null}
            {editUserPassword ? <EditUserPassword /> : null}
            {closeAccount ? <CloseAccountForm /> : null}
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            className={classes.largeScreens}
          >
            <EditUserDataButtons />
          </Grid>
        </>
      )}
      <DeleteAccountModal />
    </Grid>
  );
};

export default Dashboard;
