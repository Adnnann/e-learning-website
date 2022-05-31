import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  fetchCourses,
  getCourses,
  getCoursesDisplayPage,
  getDeleteCourseMessage,
  setCoursesDisplayPage,
  cleanDeleteCourseMessage,
  removeCourse,
  setCourseToEdit,
  getCourseDeleteModalStatus,
  setCourseDeleteModal,
  getSelectedFilterTerm,
  getLoggedUserData,
} from "../../features/eLearningSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Tooltip,
  Button,
  useMediaQuery,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  Box,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import TableComponents from "../utils/Table";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@mui/styles";

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
  addCourseButtonContainer: {
    paddingTop: "20px !important",
    paddingRight: "20px",
  },
  addCourseButton: {
    paddingRight: "10px",
    paddingTop: "20px",
    backgroundColor: "#2F4F4F !important",
    minWidth: "320px !important",
    minHeight: "50px !important",
    [theme.breakpoints.only("xs")]: {
      width: "95%",
      marginLeft: "5px !important",
    },
  },
  warningIcon: {
    fontSize: "60px",
  },
  container: { overflow: "hidden" },
  filterResults: {
    marginTop: "20px",
  },
  mentorCoursesContainer: {
    maxHeight: "50vh",
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
  mentor: {
    textAlign: "left",
    marginBottom: "15px !important",
    fontStyle: "italic",
  },
  coursesFixedContainer: {
    position: "fixed",
    [theme.breakpoints.only("xs")]: {
      position: "unset",
    },
  },
}));

const AllCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseToDelete, setCourseToDelete] = useState({});
  const filterTerm = useSelector(getSelectedFilterTerm);

  const courses = useSelector(getCourses);
  const page = useSelector(getCoursesDisplayPage);
  const deleteCourseStatus = useSelector(getDeleteCourseMessage);
  const courseDeleteModalStatus = useSelector(getCourseDeleteModalStatus);
  const loggedUser = useSelector(getLoggedUserData);

  const rows = [];

  useEffect(() => {
    if (deleteCourseStatus?.message) {
      const courses = {
        page: page,
        firstItem: page * 12 - 11,
        lastItem: page * 12,
      };
      dispatch(fetchCourses(courses));
      dispatch(setCourseDeleteModal(false));
      dispatch(cleanDeleteCourseMessage());
    }
  }, [deleteCourseStatus]);

  const handlePagination = (event, value) => {
    const courses = {
      ...filters,
      page: value,
      firstItem: value * 12 - 11,
      lastItem: value * 12,
    };

    dispatch(setCoursesDisplayPage(value));
    dispatch(fetchCourses(courses));
  };

  const [filters, setFilters] = useState({
    filterByTitle: true,
    filterByMentorName: false,
    filterTitle: "",
    filterMentorName: "",
    filterLevel: "",
    filterDuration: "",
  });

  const handleChange = (name) => (event) => {
    if (name === "filterTitle") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: true,
        filterByMentorName: false,
      });
    } else if (name === "filterMentorName") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: false,
        filterByMentorName: true,
      });
    } else {
      const courses = {
        filterLevel: filters.filterLevel ? filters.filterLevel : undefined,
        filterDuration: filters.filterDuration
          ? filters.filterDuration
          : undefined,
        filterTitle: filters.filterTitle ? filters.filterTitle : "",
        filterMentorName: filters.filterMentorName
          ? filters.filterMentorName
          : "",
        [name]: event.target.value,
        page: 1,
        firstItem: 0,
        lastItem: 11,
      };

      dispatch(setCoursesDisplayPage(1));
      dispatch(fetchCourses(courses));

      setFilters({
        ...filters,
        [name]: event.target.value,
      });
    }
  };

  const orderBy = ["A-Z", "Z-A"];

  const filterBy = [
    "filterTitle",
    "filterMentorName",
    "filterLevel",
    "filterDuration",
  ];

  const filterByTitles = [
    "Filter By Title",
    "Filter By Mentor Name",
    "Filter By Level",
    "Filter By Duration",
  ];

  const filterItems = [
    ["A-Z", "Z-A"],
    ["A-Z", "Z-A"],
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

  const edit = (id) => {
    dispatch(setCourseToEdit(id));
    navigate("/editCourse");
  };

  const remove = (id) => {
    setCourseToDelete(
      Object.values(courses.data).filter((item) => item._id === id)
    );
    dispatch(setCourseDeleteModal(true));
  };

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={2}
      className={classes.container}
    >
      <Grid item xs={12} md={6} lg={6} xl={6}>
        {filterTerm ? (
          <Alert
            variant="filled"
            color="info"
            severity="info"
            className={classes.filterResults}
          >
            {loggedUser.user.role === "admin" && courses.data.length > 1 ? (
              <>
                {`There are ${courses.data.length} results for the term `}
                <span className={classes.selectedTerm}>{filterTerm}</span>
              </>
            ) : (
              <>
                {`There is ${courses.data.length} result for the term `}
                <span className={classes.selectedTerm}>{filterTerm}</span>
              </>
            )}
          </Alert>
        ) : null}
      </Grid>
      <Grid
        container
        justifyContent={"flex-end"}
        className={classes.addCourseButtonContainer}
      >
        <Button
          variant="contained"
          onClick={() => navigate("/addCourse")}
          className={classes.addCourseButton}
        >
          Add courses
        </Button>
      </Grid>
      {Object.values(filterItems).map((item, index) => {
        return (
          <Grid key={Math.random() + 1} item xs={12} md={3} lg={2} xl={2}>
            {filterByTitles[index]}
            <SelectComponent
              className={classes.selectFields}
              array={filterItems[index]}
              selectedValue={filters[filterBy[index]]}
              handleChange={handleChange(filterBy[index])}
            />
          </Grid>
        );
      })}

      <Grid item xs={12} md={10} lg={10} xl={9}>
        <Grid container justifyContent={"space-around"}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Grid container justifyContent={"center"}>
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
          </Grid>

          {courses?.data ? (
            <Box className={classes.mentorCoursesContainer}>
              {_.chain(Object.values(courses.data))
                .orderBy(
                  [
                    filters.filterByTitle
                      ? (course) => course.title.toLowerCase()
                      : filters.filterByMentorName
                      ? (course) => course.mentorId.toLowerCase()
                      : null,
                  ],
                  [
                    filters.filterByTitle
                      ? filters.filterTitle === "A-Z"
                        ? "asc"
                        : "desc"
                      : filters.filterByMentorName
                      ? filters.filterMentorName === "A-Z"
                        ? "asc"
                        : "desc"
                      : null,
                  ]
                )
                .map((item, index) => (
                  <Card key={index} className={classes.card}>
                    <Grid
                      container
                      justifyContent={"space-around"}
                      className={classes.cardContainer}
                    >
                      <Grid item xs={12} md={3} lg={3} xl={3}>
                        <CardMedia
                          className={classes.cardImage}
                          component={"img"}
                          src={item.courseImage}
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

                        <Typography component={"p"} className={classes.mentor}>
                          Mentor: {item.mentorId}
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
    </Grid>
  );
};

export default AllCourses;
