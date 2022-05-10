import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  getUpdatedUserData,
  cleanUpdatedUserData,
  getUserToken,
  getLoggedUserData,
  uploadUserImage,
  getUploadUserImageStatus,
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
import userImagePlaceholder from "../../assets/userImgPlaceholder.png";
import { makeStyles } from "@mui/styles";

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
  const uploadUserImageStatus = useSelector(getUploadUserImageStatus);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    error: "",
  });

  const params = useParams();

  useEffect(() => {
    setValues({
      firstName: loggedUser.user.firstName,
      lastName: loggedUser.user.lastName,
      email: loggedUser.user.email,
    });

    if (updatedUserData?.message) {
      dispatch(cleanUpdatedUserData());
      navigate("/dashboard");
    }
  }, [updatedUserData.message, dispatch, loggedUser.user.firstName]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    console.log(token.message);
    const user = {
      params: loggedUser.user._id,
      data: {
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        email: values.email || undefined,
        token: token.message,
      },
    };
    dispatch(updateUserData(user));
  };

  const cancel = () => {
    navigate("/dashboard");
  };

  const uploadPhoto = () => {
    document.getElementById("userImage").click();
  };

  const handleUpload = (event) => {
    let formData = new FormData();

    //all files will be named image{allRecipes.lenght+1}.jpg
    formData.append(
      "userImage",
      event.target.files[0],
      `user_image_${loggedUser.user._id}-${Date.now()}.${
        event.target.files[0].name.split(".")[1]
      }`
    );
    dispatch(uploadUserImage(formData));
  };

  return (
    <>
      {loggedUser.user.firstName ? (
        <Card className={classes.card}>
          <input
            type="file"
            style={{ display: "none" }}
            id="userImage"
            onChange={handleUpload}
          />
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
                src={
                  loggedUser.user.userImage
                    ? loggedUser.user.userImage
                    : userImagePlaceholder
                }
                className={classes.userImagePlaceholder}
                alt="Placeholder"
              ></img>

              {uploadUserImageStatus?.error ? (
                <Typography component="p" color="error">
                  {uploadUserImageStatus.error}
                </Typography>
              ) : null}

              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                className={classes.uploadPhoto}
                onClick={uploadPhoto}
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
