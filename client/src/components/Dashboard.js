import { useState } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";
import { makeStyles } from "@mui/styles";
import { useSelect } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import EditProfile from "./EditUserProfile";
import {
  cleanStore,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
  setEditUserPasswordForm,
  setEditUserProfileForm,
  signoutUser,
} from "../features/eLearningSlice";
import DropdownButtons from "./DropdownButtons";
import EditUserPassword from "./EditUserPassword";
import { Navigate, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  notSmallScreens: {
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
}));

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editUserProfile = useSelector(getEditUserFormStatus);
  const editUserPassword = useSelector(getEditUserPasswordFormStatus);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElStatistics, setAnchorElStatistics] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const editProfile = () => {
    dispatch(setEditUserProfileForm(true));
    dispatch(setEditUserPasswordForm(false));
  };

  const editPassword = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(true));
  };

  const test3 = () => {
    console.log("test3");
  };
  const items = ["Edit Profile", "New Password", "Delete Account"];
  const clickEvents = [editProfile, editPassword, test3];

  const signout = () => {
    dispatch(signoutUser());
    dispatch(cleanStore());
    navigate("/");
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6} xl={6} className={classes.smallScreens}>
        <DashboardRightPanel />
      </Grid>
      <Grid item xs={12} md={3} lg={3} xl={3}>
        <DashboardLeftPanel />
      </Grid>
      {!editUserProfile && !editUserPassword ? (
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          xl={6}
          className={classes.notSmallScreens}
        >
          <DashboardRightPanel />
        </Grid>
      ) : editUserPassword ? (
        <>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            className={classes.smallScreens}
          >
            <ButtonGroup className={classes.editProfileButtons}>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Profile
              </Button>
              <DropdownButtons
                items={items}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                clickEvents={clickEvents}
              />
              <Button variant="contained" color="primary">
                Logout
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <EditUserPassword />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            className={classes.notSmallScreens}
          >
            <ButtonGroup className={classes.editProfileButtons}>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Profile
              </Button>

              <DropdownButtons
                items={items}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                clickEvents={clickEvents}
              />
              <Button variant="contained" color="primary" onClick={signout}>
                Logout
              </Button>
            </ButtonGroup>
          </Grid>
        </>
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
            <ButtonGroup className={classes.editProfileButtons}>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Profile
              </Button>
              <DropdownButtons
                items={items}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                clickEvents={clickEvents}
              />
              <Button variant="contained" color="primary">
                Logout
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <EditProfile />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            className={classes.notSmallScreens}
          >
            <ButtonGroup className={classes.editProfileButtons}>
              <Button variant="contained" color="primary" onClick={handleClick}>
                Profile
              </Button>

              <DropdownButtons
                items={items}
                anchorEl={anchorEl}
                open={open}
                handleClose={handleClose}
                clickEvents={clickEvents}
              />
              <Button variant="contained" color="primary">
                Logout
              </Button>
            </ButtonGroup>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
