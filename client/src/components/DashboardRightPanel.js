import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  userDashboardMessage: {
    marginTop: "50px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px",
    },
  },
}));

const DashboardRightPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.userDashboardMessage}>
      <Alert variant="filled" severity="info">
        Courses - Your Current Courses and Progress
      </Alert>
    </div>
  );
};

export default DashboardRightPanel;
