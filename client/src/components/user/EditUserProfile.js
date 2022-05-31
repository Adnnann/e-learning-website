import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserData,
  getUserToken,
  getLoggedUserData,
  uploadImage,
  getUploadUserImageStatus,
  getUpdateUserStatus,
  cleanUserUpdateMessage,
  getUserToEdit,
  setEditUserProfileForm,
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
  ButtonGroup,
} from "@mui/material";
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
    minWidth: "120px",
    marginRight: theme.spacing(2),
  },
  cancel: {
    marginBottom: theme.spacing(2),
    minWidth: "120px",
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
  const updateUserStatus = useSelector(getUpdateUserStatus);
  const uploadUserImageStatus = useSelector(getUploadUserImageStatus);
  const userToEdit = useSelector(getUserToEdit);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    error: "",
  });
  useEffect(() => {
    setValues({
      firstName: loggedUser.user.firstName || userToEdit.firstName,
      lastName: loggedUser.user.lastName || userToEdit.lastName,
      email: loggedUser.user.email || userToEdit.email,
    });

    if (updateUserStatus?.message) {
      dispatch(cleanUserUpdateMessage());
      navigate("/dashboard");
    }
  }, [updateUserStatus, dispatch, loggedUser.user.firstName]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
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
    dispatch(setEditUserProfileForm(false));
  };

  const uploadPhoto = () => {
    document.getElementById("userImage").click();
  };

  const handleUpload = (event) => {
    let formData = new FormData();

    formData.append(
      "userImage",
      event.target.files[0],
      `userImage${loggedUser.user._id}-${Date.now()}.${
        event.target.files[0].name.split(".")[1]
      }`
    );
    dispatch(uploadImage(formData));
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

                {updateUserStatus?.error && (
                  <Typography component="p" color="error">
                    <Icon color="error" className={classes.error}></Icon>
                    {updateUserStatus.error}
                  </Typography>
                )}
              </CardContent>

              <CardActions>
                <div style={{ margin: "0 auto" }}>
                  <ButtonGroup>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={clickSubmit}
                      className={classes.save}
                      style={{ marginRight: "60px" }}
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
                  </ButtonGroup>
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
