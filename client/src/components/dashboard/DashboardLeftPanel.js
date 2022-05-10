import {
  cleanStore,
  fetchAllUsers,
  getLoggedUserData,
  setEditUserProfileForm,
  signoutUser,
} from "../../features/eLearningSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faGear,
  faRightFromBracket,
  faUserGroup,
  faCube,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup, Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroupWithIcons from "./LeftSidePanelButtons";
import EditProfile from "../user/EditUserProfile";
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
    navigate("/dashboard");
  };

  const displayAllUsers = () => {
    dispatch(fetchAllUsers());
    navigate("/admin/users");
    //dispatch(setEditUserProfileForm(true));
  };

  const displayAllCourses = () => {
    //dispatch(setEditUserProfileForm(true));
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
    clickEvents: [redirectToDashboard, editUser, signout],
    buttons: ["Dashboard", "Edit Profile", "Logout"],
    icons: [faHouse, faGear, faRightFromBracket],
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
        {loggedUser.user.numberOfCompletedCourses}
      </Typography>
      <Typography variant="h6" className={classes.userInfo}>
        in progress
        <br />
        {loggedUser.user?.enrolledInCourses
          ? loggedUser.user?.enrolledInCourses.length
          : "0"}
      </Typography>
    </>
  );
};

export default DashboardLeftPanel;
