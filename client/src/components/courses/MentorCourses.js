import * as React from "react";
import { useState, useEffect } from "react";
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
  getCourseDeleteModalStatus,
  setCourseDeleteModal,
} from "../../features/eLearningSlice";
import PaginationComponent from "../utils/Pagination";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
  Tooltip,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";
import { style } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  selectFields: {
    height: "60px",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: "1px",
    marginLeft: "2px",
  },
  tooltips: {
    marginLeft: "20px",
  },
  addCourseButton: {
    marginLeft: "auto !important",
    marginBottom: "20px !important",
    minWidth: "220px",
    marginRight: "10px",
    minHeight: "50px",
    [theme.breakpoints.only("xs")]: {
      margin: "0 auto",
      marginTop: "10px",
    },
  },
  warningIcon: {
    fontSize: "60px",
  },
  mentorCoursesContainer: {
    maxHeight: "100vh",
    overflow: "auto",
    paddingBottom: "20px",
  },
  card: {
    borderStyle: "solid",
    borderWidth: "1px",
    marginBottom: "10px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  cardContainer: {
    marginBottom: "20px",
  },
  cardImage: { marginTop: "5px" },
  cardText: { paddingLeft: "10px" },
  cardTitle: {
    fontWeight: "900 !important",
    textAlign: "left",
    marginBottom: "5px !important",
  },
  description: {
    textAlign: "left",
    marginBottom: "15px !important",
  },
  level: {
    textAlign: "left",
    fontWeight: "bolder !important",
  },
  editCourse: {
    marginRight: "10px",
    fontSize: "30px !important",
  },
  deleteCourse: {
    fontSize: "30px !important",
  },
  durationAndLevelTextContainer: {
    fontSize: "12px",
    fontWeight: "bolder",
  },
}));

const MentorCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courseToDelete, setCourseToDelete] = useState({});
  const classes = useStyles();

  const loggedUser = useSelector(getLoggedUserData);
  const page = useSelector(getCoursesDisplayPage);
  const mentorCourses = useSelector(getMentorCourses);
  const courseDeleteModalStatus = useSelector(getCourseDeleteModalStatus);
  const deleteCourseStatus = useSelector(getDeleteCourseMessage);

  useEffect(() => {
    if (deleteCourseStatus?.message) {
      const courses = {
        mentorId: loggedUser.user._id,
        firstItem: 1,
        lastItem: 11,
      };
      dispatch(fetchMentorCourses(courses));
      dispatch(cleanDeleteCourseMessage());
      dispatch(setCourseDeleteModal(false));
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

  const remove = (id) => {
    setCourseToDelete(
      Object.values(mentorCourses.data).filter((item) => item._id === id)
    );
    dispatch(setCourseDeleteModal(true));
  };

  return (
    <>
      <Grid container>
        <Button
          variant="contained"
          className={classes.addCourseButton}
          onClick={() => navigate("/addCourse")}
        >
          Add Course
        </Button>
      </Grid>

      <Grid container justifyContent={"space-around"}>
        <div style={{ margin: "0 auto" }}>
          {mentorCourses?.totalNumOfCourses &&
          Math.ceil(mentorCourses.totalNumOfCourses / 12) > 1 ? (
            <PaginationComponent
              page={page}
              handleChange={handlePagination}
              numberOfPages={Math.ceil(mentorCourses.totalNumOfCourses / 12)}
              numberOfItems={Object.keys(mentorCourses.data).length}
            />
          ) : null}
        </div>

        {mentorCourses?.data ? (
          <Box className={classes.mentorCoursesContainer}>
            {_.chain(Object.values(mentorCourses.data))

              .map((item, index) => (
                <Card key={item.title} className={classes.card}>
                  <Grid
                    container
                    justifyContent={"space-around"}
                    className={classes.cardContainer}
                  >
                    <Grid item xs={12} md={3} lg={3} xl={3}>
                      <CardMedia
                        className={classes.cardImage}
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
                      className={classes.cardText}
                    >
                      <Typography variant="h5" className={classes.cardTitle}>
                        {item.title}
                      </Typography>

                      <Typography
                        component={"p"}
                        className={classes.description}
                      >
                        {item.description}
                      </Typography>

                      <span className={classes.durationAndLevelTextContainer}>
                        {`Level: ${item.level} ||`}

                        {` Duration: ${item.duration}`}
                      </span>
                    </Grid>

                    <Grid item xs={12} md={2} xl={2} lg={2}>
                      <Tooltip
                        title="Edit course"
                        className={classes.editCourse}
                      >
                        <EditOutlinedIcon
                          fontSize="small"
                          onClick={() => edit(item._id)}
                        />
                      </Tooltip>

                      <Tooltip
                        title="Delete course"
                        className={classes.deleteCourse}
                      >
                        <DeleteOutlineOutlinedIcon
                          onClick={() => remove(item._id)}
                          fontSize="small"
                        />
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Card>
              ))
              .value()}
          </Box>
        ) : (
          "Loading..."
        )}
      </Grid>
      <Dialog open={courseDeleteModalStatus}>
        <DialogTitle>Are you sure you want to delete course?</DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className={classes.warningIcon}
          />
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            color="success"
            autoFocus="autoFocus"
            variant="contained"
            onClick={() => dispatch(setCourseDeleteModal(false))}
          >
            Return back
          </Button>

          <Button
            fullWidth
            color="error"
            autoFocus="autoFocus"
            variant="contained"
            onClick={() => dispatch(removeCourse(courseToDelete[0]._id))}
          >
            Delete course
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MentorCourses;
