import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCompletedCourseMessage,
  cleanEnrollInCourseMessage,
  completeCourse,
  fetchUserCourses,
  fetchUserData,
  getAllMentors,
  getCompletedCourseMessage,
  getEnrollInCourseMessage,
  getLoggedUserData,
  getUserCourses,
} from "../../features/eLearningSlice";
import {
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginBottom: "20px",
    marginLeft: theme.spacing(2),
  },
  title: {
    textAlign: "left",
    marginLeft: "10px",
    marginBottom: "20px",
  },
  mentorName: {
    textAlign: "left",
    marginLeft: "10px",
    marginBottom: "20px",
    fontStyle: "italic",
  },
  displayCoursesContainer: {
    maxHeight: "60vh",
    overflow: "auto",
    paddingBottom: "20px",
  },
}));

const UserCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userCourses = useSelector(getUserCourses);
  const loggedUser = useSelector(getLoggedUserData);
  const allMentors = useSelector(getAllMentors);
  const completedCourseMessage = useSelector(getCompletedCourseMessage);
  const enrollInCourseStatus = useSelector(getEnrollInCourseMessage);

  useEffect(() => {
    if (enrollInCourseStatus?.message) {
      dispatch(cleanEnrollInCourseMessage());

      const user = {
        userCourses: loggedUser.user.enrolledInCourses,
        param: loggedUser.user._id,
        id: loggedUser.user._id,
        courseId:
          loggedUser.user.enrolledInCourses[
            loggedUser.user.enrolledInCourses.length - 1
          ]._id,
        completedCourses: loggedUser.user.completedCourses,
      };
      dispatch(fetchUserCourses(user));
    }
    if (completedCourseMessage?.message) {
      dispatch(cleanCompletedCourseMessage());
      dispatch(fetchUserData(loggedUser.user._id));
    }
  }, [completedCourseMessage]);

  const complete = (id) => {
    const user = {
      id: loggedUser.user._id,
      courseId: id,
    };
    dispatch(completeCourse(user));
  };

  return (
    <Box className={classes.displayCoursesContainer}>
      <Grid container>
        {userCourses?.data
          ? userCourses.data.map((item) => {
              if (!loggedUser.user.completedCourses.includes(item._id)) {
                return (
                  <Grid item xs={12} md={4} lg={3} xl={2} key={item.title}>
                    <Card className={classes.card}>
                      <CardMedia
                        component={"img"}
                        src={
                          "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU="
                        }
                      ></CardMedia>

                      <Typography variant="h5" className={classes.title}>
                        {item.title}
                      </Typography>

                      <Typography
                        component={"p"}
                        className={classes.mentorName}
                      >
                        Mentor:{" "}
                        {`${
                          allMentors.mentors.filter(
                            (user) => user._id === item.mentorId
                          )[0].firstName
                        } ${
                          allMentors.mentors.filter(
                            (user) => user._id === item.mentorId
                          )[0].lastName
                        }`}
                      </Typography>

                      <CardActions>
                        <FormControl>
                          <FormControlLabel
                            label="Completed"
                            control={
                              <Checkbox onClick={() => complete(item._id)} />
                            }
                          />
                        </FormControl>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
            })
          : "Loading..."}
      </Grid>
    </Box>
  );
};

export default UserCourses;
