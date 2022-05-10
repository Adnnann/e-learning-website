import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSignupUserForm,
  setSigninUserForm,
  signupUser,
  getSignedUser,
  cleanSignupMessage,
} from "../../features/eLearningSlice";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Icon,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  useMediaQuery,
} from "@material-ui/core/";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    textAlign: "center",
    margin: "0 auto",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      maxWidth: 260,
      padding: theme.spacing(2),
      margin: "0 auto",
      marginTop: theme.spacing(2),
    },
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(0),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(2),
      maxWidth: 220,
    },
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      marginBottom: theme.spacing(0),
    },
  },
  hasAccount: {
    margin: "auto",
    marginBottom: theme.spacing(1),
    marginRight: "0",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "30px",
    },
  },
  signin: {
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
  signUpForMentorAccount: {
    color: "green",
  },
  largeScreens: {
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  smallScreens: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  mentorAccount: {
    fontSize: "14px",
    fontWeight: "bold",
  },
}));
const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signedUser = useSelector(getSignedUser);

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "student",
    confirmationPassword: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    if (name === "mentorAccount") {
      return setValues({
        ...values,
        role: values.role === "mentor" ? "student" : "mentor",
      });
    }

    setValues({ ...values, [name]: event.target.value });
  };

  const formatUserData = (str) => {
    return (
      str.charAt(0).toUpperCase() + str.substr(1, str.length).toLowerCase()
    );
  };

  const clickSubmit = () => {
    const user = {
      firstName: formatUserData(values.firstName) || undefined,
      lastName: formatUserData(values.lastName) || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      role: values.role,
    };

    console.log(user);

    if (!values.confirmationPassword || values.confirmationPassword === "") {
      setValues({ ...values, error: "Please repeat your password" });
      return;
    } else if (values.password !== values.confirmationPassword) {
      setValues({ ...values, error: "Password do not match" });
      return;
    } else {
      setValues({ ...values, error: "" });
    }

    dispatch(signupUser(user));
  };
  const redirectToSignin = () => {
    dispatch(setSignupUserForm(false));
    dispatch(setSigninUserForm(true));
    dispatch(cleanSignupMessage());
  };

  return (
    <Grid container justifyContent="center">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Sign Up
          </Typography>

          <TextField
            id="firstName"
            placeholder="First Name"
            className={classes.textField}
            value={values.firstName}
            onChange={handleChange("firstName")}
            margin="normal"
          />
          <br />

          <TextField
            id="lastName"
            placeholder="Last Name"
            className={classes.textField}
            value={values.lastName}
            onChange={handleChange("lastName")}
            margin="normal"
          />
          <br />

          <TextField
            id="email"
            type="email"
            placeholder="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
          />
          <br />

          <TextField
            id="password"
            type="password"
            placeholder="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
          />

          <TextField
            id="confirmationPassword"
            type="password"
            placeholder="Confirmation Password"
            className={classes.textField}
            value={values.confirmationPassword}
            onChange={handleChange("confirmationPassword")}
            margin="normal"
          />
          <br />
          <br />

          {values.error ? (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}></Icon>
              {values.error}
            </Typography>
          ) : (
            signedUser?.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}></Icon>
                {signedUser.error}
              </Typography>
            )
          )}
        </CardContent>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>

        <CardActions className={classes.largeScreens}>
          <Typography component="p" className={classes.hasAccount}>
            Already have an account?
          </Typography>

          <Typography
            component="p"
            color="primary"
            className={classes.signin}
            onClick={redirectToSignin}
          >
            LOGIN
          </Typography>
        </CardActions>

        {!iPadAirScreen && !iPadMiniScreen && !surfaceDuo ? (
          <>
            <CardActions className={classes.smallScreens}>
              <Typography component="p" className={classes.hasAccount}>
                Already have an account?
              </Typography>
            </CardActions>

            <CardActions className={classes.smallScreens}>
              <Typography
                component="p"
                color="primary"
                className={classes.signin}
                onClick={redirectToSignin}
              >
                LOGIN
              </Typography>
            </CardActions>
          </>
        ) : null}

        <span className={classes.mentorAccount}>
          Mentor account <Checkbox onChange={handleChange("mentorAccount")} />
        </span>
      </Card>

      <Dialog open={signedUser?.message ? true : false}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            autoFocus="autoFocus"
            onClick={redirectToSignin}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Signup;
