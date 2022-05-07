import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { CardMedia, Grid, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserData,
  updateUserData,
  getUpdatedUserData,
  getUserData,
  loggedUserToDisplay,
  cleanUpdatedUserData,
  userToken,
  getUserToken,
  getLoggedUserData,
} from "../features/eLearningSlice";
import { useNavigate, useParams } from "react-router";
import userImagePlaceholder from "../assets/userImgPlaceholder.png";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
  tittle: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  save: {
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
  cancel: {
    marginLeft: "10px",
    marginBottom: theme.spacing(2),
    minWidth: 110,
  },
  haveaccount: {
    margin: "auto",
    marginBottom: theme.spacing(1),
    marginRight: "0",
  },
  signin: {
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
  userImagePlaceholder: {
    width: 130,
  },
  uploadPhoto: {
    minWidth: "125px",
  },
}));
const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);
  const token = useSelector(getUserToken);
  const updatedUserData = useSelector(getUpdatedUserData);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    error: "",
  });

  const params = useParams();

  useEffect(() => {
    dispatch(fetchUserData(params.userId));
    //check if user token exists.
    dispatch(userToken());
    //In case user tried to visit url /protected without token, redirect
    //to signin page
    if (
      token === "Request failed with status code 500" ||
      token === "Request failed with status code 401"
    ) {
      navigate("/");
    }
    setValues({
      firstName: loggedUser.user.firstName,
      lastName: loggedUser.user.lastName,
      email: loggedUser.user.email,
    });

    if (updatedUserData?.message) {
      dispatch(cleanUpdatedUserData());
      navigate("/dashboard");
    }
  }, [
    params.userId,
    updatedUserData.message,
    dispatch,
    loggedUser.user.firstName,
  ]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      params: params.userId,
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
    };
    dispatch(updateUserData(user));
  };

  const cancel = () => {
    navigate("/dashboard");
  };

  return (
    <>
      {loggedUser.user.firstName ? (
        <Card className={classes.card}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={8} xl={8}>
              <CardContent>
                <TextField
                  id="firstName"
                  className={classes.textField}
                  value={values.firstName ? values.firstName : ""}
                  onChange={handleChange("firstName")}
                  margin="normal"
                />
                <br />

                <TextField
                  id="lastName"
                  className={classes.textField}
                  value={values.lastName ? values.lastName : ""}
                  onChange={handleChange("lastName")}
                  margin="normal"
                />
                <br />

                <TextField
                  id="email"
                  className={classes.textField}
                  value={values.email ? values.email : ""}
                  onChange={handleChange("email")}
                  margin="normal"
                />

                <br />
                <br />

                {updatedUserData?.error && (
                  <Typography component="p" color="error">
                    <Icon color="error" className={classes.error}></Icon>
                    {updatedUserData.error}
                  </Typography>
                )}
              </CardContent>

              <CardActions>
                <div style={{ margin: "0 auto" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={clickSubmit}
                    className={classes.save}
                  >
                    Save
                  </Button>

                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.cancel}
                    onClick={cancel}
                  >
                    Cancel
                  </Button>
                </div>
              </CardActions>
            </Grid>
            <Grid item xs={12} md={2} lg={2} xl={2}>
              <img
                src={userImagePlaceholder}
                className={classes.userImagePlaceholder}
                alt="Placeholder"
              ></img>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.uploadPhoto}
              >
                Upload photo
              </Button>
            </Grid>
          </Grid>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

export default EditProfile;
