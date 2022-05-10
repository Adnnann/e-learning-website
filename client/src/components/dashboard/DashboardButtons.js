import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  cleanStore,
  setCloseAccountModal,
  setEditUserPasswordForm,
  setEditUserProfileForm,
  signoutUser,
} from "../../features/eLearningSlice";
import { makeStyles } from "@mui/styles";
import { Button, ButtonGroup } from "@material-ui/core/";
import DropdownButtons from "../utils/DropdownButtons";

const useStyles = makeStyles((theme) => ({
  notSmallScreens: {
    marginTop: "20px",
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

const EditUserDataButtons = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [anchorElStatistics, setAnchorElStatistics] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const signout = () => {
    dispatch(signoutUser());
    dispatch(cleanStore());
    navigate("/");
  };

  const editProfile = () => {
    dispatch(setEditUserProfileForm(true));
    dispatch(setEditUserPasswordForm(false));
  };

  const editPassword = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(true));
  };

  const deleteAccount = () => {
    dispatch(setEditUserProfileForm(false));
    dispatch(setEditUserPasswordForm(false));
    dispatch(setCloseAccountModal(true));
    //console.log(deleteAccountModalStatus);
  };

  const items = ["Edit Profile", "New Password", "Delete Account"];
  const clickEvents = [editProfile, editPassword, deleteAccount];

  return (
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
  );
};

export default EditUserDataButtons;
