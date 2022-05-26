import { useSelector } from "react-redux";
import {
  getCloseAccountFormStatus,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
} from "../../features/eLearningSlice";
import { makeStyles } from "@mui/styles";
import { Grid } from "@material-ui/core";
import EditUserPassword from "../user/EditUserPassword";
import { useMediaQuery } from "@mui/material";
import CloseAccountForm from "../user/DeleteAccountForm";
import DeleteAccountModal from "../user/DeleteAccountModal";
import EditUserDataButtons from "./DashboardButtons";
import EditProfile from "../user/EditUserProfile";
import DashboardLeftPanel from "./DashboardLeftPanel";
import DashboardRightPanel from "./DashboardRightPanel";

const useStyles = makeStyles((theme) => ({
  largeScreens: {
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

const Dashboard = () => {
  const classes = useStyles();
  const editUserProfile = useSelector(getEditUserFormStatus);
  const editUserPassword = useSelector(getEditUserPasswordFormStatus);
  const closeAccount = useSelector(getCloseAccountFormStatus);

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6} xl={6} className={classes.smallScreens}>
        <DashboardRightPanel />
      </Grid>
      <Grid item xs={12} md={3} lg={3} xl={3}>
        <DashboardLeftPanel />
      </Grid>
      {!editUserProfile && !editUserPassword && !closeAccount ? (
        <Grid
          item
          xs={12}
          md={8}
          lg={8}
          xl={8}
          className={classes.largeScreens}
        >
          {!iPadAirScreen && !iPadMiniScreen && !surfaceDuo ? (
            <DashboardRightPanel />
          ) : null}
        </Grid>
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
            <EditUserDataButtons />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            {editUserProfile ? <EditProfile /> : null}
            {editUserPassword ? <EditUserPassword /> : null}
            {closeAccount ? <CloseAccountForm /> : null}
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            className={classes.largeScreens}
          >
            <EditUserDataButtons />
          </Grid>
        </>
      )}
      <DeleteAccountModal />
    </Grid>
  );
};

export default Dashboard;
