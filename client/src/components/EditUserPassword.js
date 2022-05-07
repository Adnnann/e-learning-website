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
    marginLeft: "420px",
    marginTop: "20px",
    [theme.breakpoints.only("xs")]: {
      marginLeft: "130px",
    },
    [theme.breakpoints.only("md")]: {
      marginLeft: "370px",
    },
  },
}));
const EditUserPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);
  const token = useSelector(getUserToken);
  const updatedUserData = useSelector(getUpdatedUserData);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    error: "",
  });

  const params = useParams();

  useEffect(() => {
    if (updatedUserData?.message) {
      dispatch(cleanUpdatedUserData());
      navigate("/dashboard");
    }
  }, [updatedUserData.message, dispatch]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    const user = {
      params: params.userId,
      password: values.password,
    };

    if (
      values.newPassword === "" ||
      values.confirmNewPassword === "" ||
      values.passowrd === ""
    ) {
      setValues({ ...values, error: "Please enter values in all fields!" });
      return;
    } else if (values.newPassword !== values.confirmNewPassword) {
      setValues({
        ...values,
        error: "New password does not match to confirm new passowrd value!",
      });
      return;
    }

    dispatch(updateUserData(user));
  };

  const cancel = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      {loggedUser.user.firstName ? (
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="firstName"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />
            <br />

            <TextField
              id="lastName"
              className={classes.textField}
              value={values.newPassword}
              onChange={handleChange("newPassword")}
              margin="normal"
            />
            <br />

            <TextField
              id="email"
              className={classes.textField}
              value={values.confirmNewPassword}
              onChange={handleChange("confirmNewPassword")}
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
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditUserPassword;
