import { useDispatch, useSelector } from "react-redux";
import {
  cleanCompletedCourseMessage,
  completeCourse,
  fetchUserData,
  getAllMentors,
  getCompletedCourseMessage,
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
} from "@mui/material";
import { useEffect } from "react";

const UserCourses = () => {
  const dispatch = useDispatch();
  const userCourses = useSelector(getUserCourses);
  const loggedUser = useSelector(getLoggedUserData);
  const allMentors = useSelector(getAllMentors);
  const completedCourseMessage = useSelector(getCompletedCourseMessage);

  useEffect(() => {
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
    <Grid container spacing={2}>
      {userCourses?.data
        ? userCourses.data.map((item) => {
            if (
              loggedUser.user.enrolledInCourses.includes(item._id) &&
              !loggedUser.user.completedCourses.includes(item._id)
            ) {
              return (
                <Grid item xs={12} md={2} lg={2} xl={2}>
                  <Card style={{ marginBottom: "20px" }}>
                    <CardMedia
                      component={"img"}
                      src={
                        "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU="
                      }
                    ></CardMedia>

                    <Typography
                      variant="h5"
                      style={{
                        textAlign: "left",
                        marginLeft: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      component={"p"}
                      style={{
                        textAlign: "left",
                        marginLeft: "10px",
                        marginBottom: "20px",
                        fontStyle: "italic",
                      }}
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
                            <Checkbox
                              onClick={() => complete(item._id)}
                              //onChange={handleDurationFilter("filterDuration")}
                              //checked={checked[index + 4]}
                            />
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
  );
};

export default UserCourses;
