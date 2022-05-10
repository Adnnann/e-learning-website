import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  userDashboardMessage: {
    width: "100%",
    fontSize: "40px",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px",
      width: "100%",
    },
    marginTop: window.innerWidth === 820 ? "0px" : "50px",
  },
}));

const DashboardRightPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.userDashboardMessage}>
      <Alert variant="filled" severity="info" style={{ fontSize: "20px" }}>
        Courses - Your Current Courses and Progress
      </Alert>
    </div>
  );
};

export default DashboardRightPanel;
