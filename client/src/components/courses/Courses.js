import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import {
  cleanEnrollInCourseMessage,
  enrollInCourse,
  fetchCourses,
  fetchMentors,
  fetchUserCourses,
  fetchUserData,
  getCourseOverviewModal,
  getCourses,
  getCoursesDisplayPage,
  getEnrollInCourseMessage,
  getLoggedUserData,
  getUserData,
  setCoursesDisplayPage,
  setDisplayUserCourses,
} from "../../features/eLearningSlice";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Checkbox,
  Button,
  Box,
  FormControlLabel,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PaginationComponent from "../utils/Pagination";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect } from "react";

const Courses = () => {
  const courses = useSelector(getCourses);
  const dispatch = useDispatch();
  const loggedUser = useSelector(getLoggedUserData);
  const [checked, setChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [courseOverviewModal, setCourseOverviewModal] = useState(false);

  const [courseToDisplay, setCourseToDisplay] = useState([]);
  const page = useSelector(getCoursesDisplayPage);
  const enrollInCourseStatus = useSelector(getEnrollInCourseMessage);
  const navigate = useNavigate();
  const [displayFilters, setDisplayFilters] = useState(false);

  useEffect(() => {
    if (enrollInCourseStatus?.message) {
      dispatch(cleanEnrollInCourseMessage());
      dispatch(fetchMentors());

      dispatch(fetchUserData(loggedUser.user._id));

      const user = {
        userCourses: loggedUser.user.enrolledInCourses,
        param: loggedUser.user._id,
        id: loggedUser.user._id,
        courseId: courseToDisplay[0]._id,
        completedCourses: loggedUser.user.completedCourses,
      };

      dispatch(fetchUserCourses(user));
      navigate("/dashboard");
    }
  }, [enrollInCourseStatus]);

  const [filters, setFilters] = useState({
    filterByTitle: true,
    filterByDuration: false,
    filterByLevel: false,
    filterTitle: "",
    filterMentorName: "",
    filterLevel: "",
    filterDuration: "",
  });

  const enroll = () => {
    const user = {
      userCourses: loggedUser.user.enrolledInCourses,
      param: loggedUser.user._id,
      id: loggedUser.user._id,
      courseId: courseToDisplay[0]._id,
      completedCourses: loggedUser.user.completedCourses,
    };

    dispatch(enrollInCourse(user));

    setCourseOverviewModal(false);
  };

  const showModal = (title) => {
    setCourseToDisplay(courses.data.filter((item) => item.title === title));

    setCourseOverviewModal(true);
  };

  const handleLevelFilter = (name) => (event) => {
    checked[0] = event.target.name === "Beginner Level" ? !checked[0] : "";
    checked[1] = event.target.name === "Intermeditate Level" ? !checked[1] : "";
    checked[2] = event.target.name === "Advanced Level" ? !checked[2] : "";
    checked[3] = event.target.name === "All levels" ? !checked[3] : "";

    setFilters({
      ...filters,
      [name]: event.target.name,
      filterByLevel: true,
    });

    const courses = {
      filterDuration: checked.slice(5, 10).includes(true)
        ? filters.filterDuration
        : undefined,
      filterLevel: checked.slice(0, 4).includes(true)
        ? event.target.name
        : undefined,
      page: 1,
      firstItem: 0,
      lastItem: 11,
    };

    dispatch(setCoursesDisplayPage(1));
    dispatch(fetchCourses(courses));
  };

  const handleDurationFilter = (name) => (event) => {
    checked[4] = event.target.name === "0 - 3 Hours" ? !checked[4] : "";
    checked[5] = event.target.name === "3 - 6 Hours" ? !checked[5] : "";
    checked[6] = event.target.name === "6 - 12 Hours" ? !checked[6] : "";
    checked[7] = event.target.name === "1 - 2 Days" ? !checked[7] : "";
    checked[8] = event.target.name === "2 - 5 Days" ? !checked[8] : "";
    checked[9] = event.target.name === "5 - 15 Days" ? !checked[9] : "";

    setFilters({
      ...filters,
      [name]: event.target.name,
      filterByDuration: true,
    });

    const courses = {
      filterLevel: checked.slice(0, 4).includes(true)
        ? filters.filterLevel
        : undefined,
      filterDuration: checked.slice(4, 10).includes(true)
        ? event.target.name
        : undefined,
      page: 1,
      firstItem: 0,
      lastItem: 11,
    };

    dispatch(setCoursesDisplayPage(1));
    dispatch(fetchCourses(courses));
  };

  const filterItems = [
    ["Beginner Level", "Intermeditate Level", "Advanced Level", "All levels"],
    [
      "0 - 3 Hours",
      "3 - 6 Hours",
      "6 - 12 Hours",
      "1 - 2 Days",
      "2 - 5 Days",
      "5 - 15 Days",
    ],
  ];

  const handlePagination = (event, value) => {
    const courses = {
      filterLevel: checked.slice(0, 4).includes(true)
        ? filters.filterLevel
        : undefined,
      filterDuration: checked.slice(4, 10).includes(true)
        ? filters.filterDuration
        : undefined,
      page: value,
      firstItem: value * 12 - 11,
      lastItem: value * 12,
    };

    dispatch(setCoursesDisplayPage(value));
    dispatch(fetchCourses(courses));
  };

  return (
    <Grid
      container
      spacing={2}
      style={{ paddingTop: "50px", position: "fixed" }}
      justifyContent="center"
    >
      <Grid item xs={12} md={2} lg={2} xl={2}>
        <Box justifyContent={"center"}>
          <Button
            onClick={() => setDisplayFilters(!displayFilters)}
            style={{ marginTop: "50px", marginBottom: "20px" }}
            startIcon={<FilterListIcon />}
            endIcon={
              displayFilters ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowUpIcon />
              )
            }
            color={"info"}
            variant="contained"
            fullWidth
          >
            Filters
          </Button>
        </Box>
        {displayFilters ? (
          <>
            <Box
              justifyContent={"center"}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                paddingLeft: "10px",
              }}
            >
              {filterItems[0].map((item, index) => {
                return (
                  <FormControl>
                    <FormControlLabel
                      label={item}
                      control={
                        <Checkbox
                          name={item}
                          onChange={handleLevelFilter("filterLevel")}
                          checked={checked[index]}
                        />
                      }
                    />
                  </FormControl>
                );
              })}
            </Box>

            <Box
              justifyContent={"center"}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                paddingLeft: "10px",
                marginTop: "20px",
              }}
            >
              {filterItems[1].map((item, index) => {
                return (
                  <FormControl>
                    <FormControlLabel
                      label={item}
                      control={
                        <Checkbox
                          name={item}
                          onChange={handleDurationFilter("filterDuration")}
                          checked={checked[index + 4]}
                        />
                      }
                    />
                  </FormControl>
                );
              })}
            </Box>
          </>
        ) : null}
      </Grid>
      {/* ?show course popup window */}
      <Grid item xs={12} md={5} lg={5} xl={5}>
        <Dialog open={courseOverviewModal}>
          {courseOverviewModal &&
          loggedUser.user.enrolledInCourses.includes(courseToDisplay[0]._id) ? (
            <Typography
              component={"p"}
              style={{
                marginTop: "20px",
                color: "red",
                marginBottom: "0px",
                textAlign: "center",
              }}
            >
              You are already enrolled into this course
            </Typography>
          ) : null}
          <DialogTitle>
            {courseToDisplay[0]?.title ? courseToDisplay[0].title : null}
          </DialogTitle>
          <DialogContent>
            {courseToDisplay[0]?.description
              ? courseToDisplay[0].description.split(".").map((item) => {
                  return (
                    <DialogContentText>
                      {item !== "" ? `> ${item}` : null}
                    </DialogContentText>
                  );
                })
              : null}
          </DialogContent>
          <DialogActions>
            {courseOverviewModal &&
            loggedUser.user.enrolledInCourses.includes(
              courseToDisplay[0]._id
            ) ? (
              <>
                <br />
                <Button
                  fullWidth
                  color="primary"
                  autoFocus="autoFocus"
                  variant="contained"
                  onClick={() => setCourseOverviewModal(false)}
                >
                  Return back
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                color="primary"
                autoFocus="autoFocus"
                variant="contained"
                onClick={enroll}
              >
                Enroll
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {courses?.data ? (
          <Box
            style={{
              maxHeight: "100vh",
              overflow: "auto",
              paddingBottom: "20px",
            }}
          >
            <Grid
              container
              justifyContent={"center"}
              style={{ marginBottom: "50px" }}
            >
              {courses?.totalNumOfCourses &&
              Math.ceil(courses.totalNumOfCourses / 12) > 1 ? (
                <PaginationComponent
                  page={page}
                  handleChange={handlePagination}
                  numberOfPages={Math.ceil(courses.totalNumOfCourses / 12)}
                  numberOfItems={Object.keys(courses.data).length}
                />
              ) : null}
            </Grid>

            {_.chain(Object.values(courses.data))

              .map((item, index) => (
                <>
                  <Card style={{ marginBottom: "20px" }}>
                    <Grid container justifyContent={"flex-start"}>
                      <Grid item xs={12} md={4} lg={4} xl={4}>
                        <CardMedia
                          onMouseEnter={() => showModal(item.title)}
                          component={"img"}
                          src={
                            "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU="
                          }
                        ></CardMedia>
                      </Grid>
                      <Grid item xs={12} md={8} lg={8} xl={8}>
                        <Typography
                          variant="h4"
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
                            marginBottom: "50px",
                          }}
                        >
                          {item.description}
                        </Typography>
                        <span style={{ fontWeight: "bold" }}>
                          <Typography
                            component={"p"}
                            style={{
                              textAlign: "left",
                              marginLeft: "10px",
                              display: "inline-flex",
                              fontWeight: "bolder",
                            }}
                          >
                            {`Duration: ${item.duration}`}
                          </Typography>
                          <Typography
                            component={"p"}
                            style={{
                              textAlign: "left",
                              marginLeft: "70px",
                              display: "inline-flex",
                              fontWeight: "bolder",
                            }}
                          >
                            {`Level: ${item.level}`}
                          </Typography>
                        </span>
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
    </Grid>
  );
};

export default Courses;
