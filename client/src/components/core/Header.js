import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setSigninUserForm,
  setSignupUserForm,
  getLoggedUserData,
  cleanLoginMessage,
  cleanSignupMessage,
} from "../../features/eLearningSlice";
import { Box, Button, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import Search from "../utils/Search";
import { makeStyles } from "@mui/styles";
import { faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

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
    textAlign: "left",
    marginTop: "40px !important",
    [theme.breakpoints.up("xs")]: {
      marginLeft: "20px !important",
    },
    [theme.breakpoints.only("xl")]: {
      marginTop: "120px !important",
    },
    [theme.breakpoints.up("md")]: {
      textAlign: "right",
      marginLeft: "60px",
    },
    [theme.breakpoints.up("lg")]: {
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
  buttons: {
    marginTop: "40px !important",
    [theme.breakpoints.up("xl")]: {
      marginTop: "120px !important",
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
    marginLeft: "10px",
  },
  signupButton: {
    textTransform: "none !important",
    marginLeft: "10px !important",
  },
  searchField: {
    marginTop: "40px",
    [theme.breakpoints.only("xl")]: {
      marginTop: "120px",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector(getLoggedUserData);

  const login = () => {
    dispatch(setSignupUserForm(false));
    dispatch(setSigninUserForm(true));
    dispatch(cleanSignupMessage());
  };

  const signup = () => {
    dispatch(setSigninUserForm(false));
    dispatch(setSignupUserForm(true));
    dispatch(cleanLoginMessage());
  };

  const redirectToDashboard = () => {
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
              <Grid item xs={12} md={3} lg={3} xl={3} className={classes.title}>
                <Typography variant="h5">Student Dashboard</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.searchFieldContainer}
              >
                <div className={classes.searchField}>
                  <Search />
                </div>
              </Grid>
            </>
          ) : (
            <>
              <Grid
                item
                xs={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.searchFieldContainerSignedUser}
              >
                <div className={classes.searchField}>
                  <Search />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={3}
                lg={3}
                xl={3}
                className={classes.buttons}
              >
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
