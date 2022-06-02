import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signinUser,
  userToken,
  setSigninUserForm,
  setSignupUserForm,
  getLoggedUserData,
  cleanLoginMessage,
  fetchCourses,
  fetchMentorCourses,
  fetchUsers,
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
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    [theme.breakpoints.only("xs")]: {
      maxWidth: 220,
    },
  },
  submit: {
    marginBottom: theme.spacing(2),
    margin: "0 auto",
  },
  signup: {
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
}));

const Login = () => {
  const classes = useStyles();
  const loggedUserData = useSelector(getLoggedUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loggedUserData?.token) {
      dispatch(userToken());

      if (loggedUserData.user.role === "mentor") {
        const user = {
          mentorId: loggedUserData.user._id,
          firstItem: 1,
          lastItem: 11,
        };

        dispatch(fetchMentorCourses(user));
        navigate("/dashboard");
        return;
      }

      const courses = {
        firstValue: 1,
        lastValue: 12,
      };

      dispatch(fetchCourses(courses));

      if (loggedUserData.user.role !== "admin") {
        navigate("/courses");
      } else {
        const users = {
          firstItem: 0,
          lastItem: 11,
        };

        dispatch(fetchUsers(users));
        navigate("/dashboard");
      }
    }
  }, [loggedUserData]);

  const clickSubmit = () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };
    dispatch(signinUser(user));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const redirectToSignup = () => {
    dispatch(setSigninUserForm(false));
    dispatch(setSignupUserForm(true));
    dispatch(cleanLoginMessage());
  };

  return (
    <Card className={classes.card}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <CardContent>
            <Typography variant="h6" className={classes.tittle}>
              LOGIN
            </Typography>

            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <br />

            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />
            <br />
            {
              //display error returned from server
              Object.keys(loggedUserData).length !== 0 && (
                <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}></Icon>
                  {loggedUserData.error}
                </Typography>
              )
            }
          </CardContent>
        </Grid>
        <Grid item xs={12} md={12} lg={3} xl={3}>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={clickSubmit}
              className={classes.submit}
            >
              Login
            </Button>
          </CardActions>
        </Grid>
        <br />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={12} lg={6} xl={6}>
            <CardActions>
              <Typography component="p" className={classes.noaccount}>
                No account?
              </Typography>

              <Typography
                component="p"
                color="primary"
                className={classes.signup}
                onClick={redirectToSignup}
              >
                SIGN UP
              </Typography>
            </CardActions>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Login;
