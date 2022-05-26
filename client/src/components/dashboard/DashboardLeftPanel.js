import {
  cleanStore,
  fetchCourses,
  fetchUsers,
  getLoggedUserData,
  setEditUserProfileForm,
  signoutUser,
} from "../../features/eLearningSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardUser,
  faHouse,
  faGear,
  faRightFromBracket,
  faUserGroup,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroupWithIcons from "./LeftSidePanelButtons";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  userIcon: {
    fontSize: "48px",
    marginTop: "60px",
  },
  buttons: {
    fontSize: "24px",
    marginTop: "30px",
    textTransform: "none",
  },
  userInfo: {
    marginTop: "20px",
    color: "blue",
    fontSize: "28px",
  },
}));

const DashboardLeftPanel = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUser = useSelector(getLoggedUserData);

  const redirectToDashboard = () => {
    dispatch(setEditUserProfileForm(false));
    navigate("/dashboard");
  };

  const displayAllUsers = () => {
    const users = {
      firstItem: 0,
      lastItem: 11,
    };
    dispatch(fetchUsers(users));
    navigate("/users");
  };

  const displayAllCourses = () => {
    const courses = {
      firstItem: 0,
      lastItem: 11,
    };

    const users = {
      firstItem: 0,
      lastItem: 11,
    };

    dispatch(fetchUsers(users));
    dispatch(fetchCourses(courses));
    navigate("/admin/courses");
  };

  const viewAllAvailableCourses = () => {
    const courses = {
      firstValue: 1,
      lastValue: 12,
    };

    dispatch(fetchCourses(courses));
    navigate("/courses");
  };

  const editUser = () => {
    dispatch(setEditUserProfileForm(true));
  };

  const signout = () => {
    dispatch(signoutUser());
    dispatch(cleanStore());
    navigate("/");
  };

  const adminButtonsAndIcons = {
    clickEvents: [
      redirectToDashboard,
      displayAllUsers,
      displayAllCourses,
      editUser,
      signout,
    ],
    buttons: ["Dashboard", "Users", "Courses", "Edit Profile", "Logout"],
    icons: [faHouse, faUserGroup, faCube, faGear, faRightFromBracket],
  };

  const userButtonsAndIcons = {
    clickEvents: [
      redirectToDashboard,
      viewAllAvailableCourses,
      editUser,
      signout,
    ],
    buttons: ["Dashboard", "Courses", "Edit Profile", "Logout"],
    icons: [faHouse, faChalkboardUser, faGear, faRightFromBracket],
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faUser}
        className={classes.userIcon}
        color="primary"
      />
      <Typography className={classes.username}>
        {`${formatUserData(loggedUser.user.firstName)} ${formatUserData(
          loggedUser.user.lastName
        )}`}
      </Typography>

      <ButtonGroupWithIcons
        buttons={
          loggedUser.user.role === "admin"
            ? adminButtonsAndIcons.buttons
            : userButtonsAndIcons.buttons
        }
        clickEvents={
          loggedUser.user.role === "admin"
            ? adminButtonsAndIcons.clickEvents
            : userButtonsAndIcons.clickEvents
        }
        icons={
          loggedUser.user.role === "admin"
            ? adminButtonsAndIcons.icons
            : userButtonsAndIcons.icons
        }
      />

      <Typography variant="h6" className={classes.userInfo}>
        Completed
        <br />
        courses
        <br />
        {loggedUser.user.completedCourses.length}
      </Typography>
      <Typography variant="h6" className={classes.userInfo}>
        In progress
        <br />
        {loggedUser.user?.enrolledInCourses
          ? [...new Set(loggedUser.user.enrolledInCourses)].length -
            loggedUser.user.completedCourses.length
          : "0"}
      </Typography>
    </>
  );
};

export default DashboardLeftPanel;
