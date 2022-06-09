import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import {
  setSigninUserForm,
  setSignupUserForm,
  getLoggedUserData,
  cleanLoginMessage,
  cleanSignupMessage,
  setFilter,
  fetchUsers,
  fetchCourses,
  cleanFilterTerm,
  setEditUserPasswordForm,
  setEditUserProfileForm,
  setDeleteAccountModal,
  setCloseAccountForm,
  setCloseAccountModal,
  userToken,
  reLoginUser,
  getUserToken,
  fetchUserCourses,
  cleanReloginStatus,
  fetchMentors,
  fetchMentorCourses,
  cleanStore,
  getSignedOutUserStatus,
} from "../../features/eLearningSlice";
import { Box, Button, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import Search from "../utils/Search";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 220,
    marginTop: "20px !important",
    borderRadius: "50%",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "120px",
      marginBottom: "20px",
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "120px",
      marginBottom: "20px",
    },
    [theme.breakpoints.only("lg")]: {
      maxWidth: "120px",
      marginBottom: "20px",
    },
  },
  rightButtons: {
    marginRight: "2px",
    marginTop: "50px",
    textTransform: "none",
    marginLeft: "auto",
  },
  headerContainer: {
    paddingBottom: "20px",
  },
  title: {
    marginTop: "60px !important",
    [theme.breakpoints.only("xs")]: {
      marginTop: "10px !important",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "right",
    },
  },
  searchInput: {
    paddingLeft: "100px",
  },
  searchFieldContainer: {
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
    },
  },
  searchFieldContainerSignedUser: {
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "120px",
      marginLeft: "60px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "50px",
    },
  },
  loginButton: {
    textTransform: "none !important",
    marginLeft: "30px !important",
    marginTop: "60px !important",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "0px !important",
      marginTop: "10px !important",
    },
  },
  signupButton: {
    textTransform: "none !important",
    marginLeft: "10px !important",
    marginTop: "60px !important",
    [theme.breakpoints.only("xs")]: {
      marginTop: "10px !important",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUserData);
  const signoutUserStatus = useSelector(getSignedOutUserStatus);

  const token = useSelector(getUserToken);

  const routes = [
    "/dashboard",
    "/admin/users",
    "/admin/courses",
    "/editCourse",
    "/editProfile",
    "/addCourse",
    "/courses",
    "/admin/createUser",
    "/unathorizedUser",
  ];

  useEffect(() => {
    if (!routes.includes(window.location.pathname)) {
      navigate("/");
    }
    if (token.length > 0 && token !== "user reloged") {
      console.log(token);
      navigate("/unathorizedUser");
      dispatch(cleanStore());
    }
  }, [token]);

  const login = () => {
    if (window.location !== "/") {
      navigate("/");
    }
    dispatch(setSignupUserForm(false));
    dispatch(setSigninUserForm(true));
    dispatch(cleanSignupMessage());
  };

  const signup = () => {
    if (window.location !== "/") {
      navigate("/");
    }
    dispatch(setSigninUserForm(false));
    dispatch(setSignupUserForm(true));
    dispatch(cleanLoginMessage());
  };

  const redirectToDashboard = () => {
    dispatch(cleanFilterTerm());

    if (loggedUser?.user && loggedUser.user.role === "admin") {
      const users = {
        firstItem: 0,
        lastItem: 12,
      };

      dispatch(fetchUsers(users));
    }
    const courses = {
      firstItem: 0,
      lastItem: 12,
      filterTerm: undefined,
    };

    dispatch(fetchCourses(courses));
    dispatch(setFilter(""));

    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountForm(false));
    dispatch(setCloseAccountModal(false));

    window.location.pathname !== "/" && navigate("/dashboard");
  };

  return (
    <AppBar position="static" className={classes.headerContainer}>
      <Toolbar>
        <Grid container justifyContent="center">
          <Grid item xs={3} md={2} lg={2} xl={2}>
            <Box
              component="img"
              className={classes.logo}
              alt="Expense tracker"
              src="https://www.elearning-journal.com/wp-content/uploads/2019/08/news_07082019_11.jpg"
              onClick={redirectToDashboard}
            />
          </Grid>

          {loggedUser?.user ? (
            <>
              <Grid item xs={12} md={3} lg={3} xl={3}>
                <Typography variant="h5" className={classes.title}>
                  {loggedUser.user.role === "admin"
                    ? "Admin Dashboard"
                    : loggedUser.user.role === "mentor"
                    ? "Mentor Dashboard"
                    : loggedUser.user.role === "student"
                    ? "Student Dashboard"
                    : null}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Search />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} md={6} lg={6} xl={6}>
                <Search />
              </Grid>
              <Grid item xs={12} md={3} lg={3} xl={3}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={login}
                  className={classes.loginButton}
                >
                  Log In
                </Button>

                <Button
                  variant="contained"
                  color="info"
                  onClick={signup}
                  className={classes.signupButton}
                >
                  Sign Up
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
