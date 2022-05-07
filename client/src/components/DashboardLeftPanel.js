import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { ClassNames } from "@emotion/react";
import { ButtonGroup, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanStore,
  getLoggedUserData,
  setEditUserProfileForm,
  signoutUser,
} from "../features/eLearningSlice";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

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

  const signout = () => {
    dispatch(signoutUser());
    dispatch(cleanStore());
    navigate("/");
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faUser}
        className={classes.userIcon}
        color="primary"
      />
      <Typography
        className={classes.username}
      >{`${loggedUser.user.firstName} ${loggedUser.user.lastName}`}</Typography>
      <ButtonGroup orientation="vertical">
        <Button
          color="primary"
          className={classes.buttons}
          startIcon={
            <FontAwesomeIcon icon={faHouse} style={{ fontSize: "24px" }} />
          }
        >
          Dashboard
        </Button>
        <Button
          color="primary"
          className={classes.buttons}
          startIcon={
            <FontAwesomeIcon icon={faGear} style={{ fontSize: "24px" }} />
          }
          onClick={() => dispatch(setEditUserProfileForm(true))}
        >
          Edit Profile
        </Button>
        <Button
          color="primary"
          className={classes.buttons}
          onClick={signout}
          startIcon={
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ fontSize: "24px" }}
            />
          }
        >
          Logout
        </Button>
      </ButtonGroup>

      <Typography variant="h6" className={classes.userInfo}>
        Completed
        <br />
        courses
        <br />
        {0}
      </Typography>
      <Typography variant="h6" className={classes.userInfo}>
        in progress
        <br />
        {0}
      </Typography>
    </>
  );
};

export default DashboardLeftPanel;
