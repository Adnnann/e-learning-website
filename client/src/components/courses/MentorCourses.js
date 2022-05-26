import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import {
  fetchMentorCourses,
  getCoursesDisplayPage,
  getLoggedUserData,
  getMentorCourses,
  removeCourse,
  setCoursesDisplayPage,
  setCourseToEdit,
  getDeleteCourseMessage,
  cleanDeleteCourseMessage,
} from "../../features/eLearningSlice";
import { Typography, Grid, Card, CardMedia, Box, Button } from "@mui/material";
import PaginationComponent from "../utils/Pagination";
import { useEffect } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";

const MentorCourses = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);
  const page = useSelector(getCoursesDisplayPage);
  const mentorCourses = useSelector(getMentorCourses);
  const deleteCourseStatus = useSelector(getDeleteCourseMessage);
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteCourseStatus?.message) {
      const courses = {
        mentorId: loggedUser.user._id,
        firstItem: 1,
        lastItem: 11,
      };
      dispatch(fetchMentorCourses(courses));
      dispatch(cleanDeleteCourseMessage());
    }
  }, [deleteCourseStatus]);

  const handlePagination = (event, value) => {
    const courses = {
      mentorId: loggedUser.user._id,
      firstItem: value * 12 - 11,
      lastItem: value * 12,
    };

    dispatch(setCoursesDisplayPage(value));
    dispatch(fetchMentorCourses(courses));
  };

  const edit = (id) => {
    dispatch(setCourseToEdit(id));
    navigate("/editCourse");
  };

  return (
    <>
      <Grid container>
        <Button
          variant="contained"
          style={{ marginLeft: "auto", marginBottom: "20px" }}
          onClick={() => navigate("/addCourse")}
        >
          Add Course
        </Button>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={4} lg={4} xl={4}>
          {mentorCourses?.totalNumOfCourses &&
          Math.ceil(mentorCourses.totalNumOfCourses / 12) > 1 ? (
            <PaginationComponent
              page={page}
              handleChange={handlePagination}
              numberOfPages={Math.ceil(mentorCourses.totalNumOfCourses / 12)}
              numberOfItems={Object.keys(mentorCourses.data).length}
            />
          ) : null}
        </Grid>
        {mentorCourses?.data ? (
          <Box
            style={{
              maxHeight: "100vh",
              overflow: "auto",
              paddingBottom: "20px",
            }}
          >
            {_.chain(Object.values(mentorCourses.data))

              .map((item, index) => (
                <>
                  <Card
                    key={item.title}
                    style={{
                      borderStyle: "solid",
                      borderWidth: "1px",
                      marginBottom: "10px",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-around"}
                      style={{ marginBottom: "20px" }}
                    >
                      <Grid item xs={12} md={3} lg={3} xl={3}>
                        <CardMedia
                          style={{ marginTop: "5px" }}
                          component={"img"}
                          src={
                            "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU="
                          }
                        ></CardMedia>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        xl={6}
                        style={{ paddingLeft: "10px" }}
                      >
                        <Typography
                          variant="h5"
                          style={{
                            fontWeight: "bold",
                            textAlign: "left",
                            marginBottom: "5px",
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          component={"p"}
                          style={{
                            textAlign: "left",
                            marginBottom: "15px",
                          }}
                        >
                          {item.description}
                        </Typography>

                        <Typography
                          component={"p"}
                          style={{
                            textAlign: "left",
                            fontWeight: "bolder",
                          }}
                        >
                          {`Level: ${item.level}`}
                          <br />

                          {`Duration: ${item.duration}`}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={2} xl={2} lg={2}>
                        <Tooltip
                          title="Edit course"
                          style={{
                            marginRight: "10px",
                            fontSize: "30px",
                          }}
                        >
                          <EditOutlinedIcon
                            fontSize="small"
                            onClick={() => edit(item._id)}
                          />
                        </Tooltip>

                        <Tooltip
                          title="Delete course"
                          style={{ fontSize: "30px" }}
                        >
                          <DeleteOutlineOutlinedIcon
                            onClick={() => dispatch(removeCourse(item._id))}
                            fontSize="small"
                          />
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Card>
                </>
              ))
              .value()}
          </Box>
        ) : (
          "Loading..."
        )}
      </Grid>
    </>
  );
};

export default MentorCourses;
