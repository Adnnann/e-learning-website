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
} from "../../features/eLearningSlice";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip, Button, useMediaQuery, Grid } from "@mui/material";
import TableComponents from "../utils/Table";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";
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
  addCourseButton: {
    paddingRight: "10px",
    paddingTop: "20px",
  },
}));

const AllCourses = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const page = useSelector(getCoursesDisplayPage);
  const deleteCourseStatus = useSelector(getDeleteCourseMessage);
  const navigate = useNavigate();

  const rows = [];

  const iPadAirScreen = useMediaQuery("(width:820px)");
  const iPadMiniScreen = useMediaQuery("(width:768px)");
  const surfaceDuo = useMediaQuery("(width:912px)");

  useEffect(() => {
    if (deleteCourseStatus?.message) {
      const courses = {
        page: page,
        firstItem: page * 12 - 11,
        lastItem: page * 12,
      };
      dispatch(fetchCourses(courses));
      dispatch(cleanDeleteCourseMessage());
    }
  }, [deleteCourseStatus]);

  const handlePagination = (event, value) => {
    const courses = {
      filterValue: filters.filterByLevel
        ? filters.filterLevel
        : filters.filterByDuration
        ? filters.filterDuration
        : undefined,
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
    filterByDuration: false,
    filterByLevel: false,
    filterTitle: "",
    filterMentorName: "",
    filterLevel: "",
    filterDuration: "",
  });

  const columns = [
    {
      id: "title",
      label: "Title",
      minWidth: 160,
      align: "center",
    },
    {
      id: "mentor",
      label: "Mentor",
      maxWidth: 120,
      align: "center",
    },
    {
      id: "description",
      label: "Description",
      minWidth: 120,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "level",
      label: "Level",
      minWidth: 120,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "duration",
      label: "Duration",
      minWidth: 100,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },

    {
      id: "edit",
      label: null,
      minWidth: 100,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const createColumns = (title, mentor, description, level, duration, edit) => {
    return { title, mentor, description, level, duration, edit };
  };

  const createRows = () => {
    if (courses?.data) {
      (filters.filterByLevel === true || filters.filterByDuration === true
        ? _.chain(
            Object.values(courses.data).filter((item) =>
              filters.filterByLevel
                ? item.level === filters.filterLevel
                : filters.filterByDuration
                ? item.duration === filters.filterDuration
                : ""
            )
          )
        : _.chain(Object.values(courses.data))
      )

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

        .map((item) => {
          const firstCol = <div>{item.title}</div>;
          const secondCol = <div>{item.mentorId}</div>;
          const thirdCol = (
            <div>
              {item.description.split(".").map((item) => {
                return (
                  <>
                    {item}
                    <br />
                  </>
                );
              })}
            </div>
          );
          const fourthCol = <div>{item.level}</div>;
          const fifthCol = <div>{item.duration}</div>;
          const sixthCol = (
            <span>
              <Tooltip title="Edit course">
                <EditOutlinedIcon
                  fontSize="small"
                  onClick={() => edit(item._id)}
                />
              </Tooltip>

              <Tooltip title="Delete course" className={classes.tooltips}>
                <DeleteOutlineOutlinedIcon
                  onClick={() => dispatch(removeCourse(item._id))}
                  fontSize="small"
                />
              </Tooltip>
            </span>
          );

          rows.push(
            createColumns(
              firstCol,
              secondCol,
              thirdCol,
              fourthCol,
              fifthCol,
              sixthCol
            )
          );
        })
        .value();
    }
  };

  const handleChange = (name) => (event) => {
    if (event.target.value === "All levels") {
      const courses = {
        filterLevel: undefined,
        filterDuration: undefined,
        page: 1,
        firstItem: 0,
        lastItem: 11,
      };

      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: false,
        filterByMentorName: false,
        filterByDuration: false,
        filterByLevel: false,
      });

      dispatch(fetchCourses(courses));
    } else if (name === "filterTitle") {
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
    } else if (name === "filterLevel") {
      const courses = {
        filterLevel: event.target.value,
        filterDuration:
          filters.filterDuration !== "" ? filters.filterDuration : undefined,
        page: 1,
        firstItem: 0,
        lastItem: 11,
      };

      dispatch(setCoursesDisplayPage(1));
      dispatch(fetchCourses(courses));

      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByDuration: false,
        filterByLevel: true,
      });
    } else {
      const courses = {
        filterLevel:
          filters.filterLevel === "All levels"
            ? undefined
            : filters.filterLevel !== ""
            ? filters.filterLevel
            : undefined,
        filterDuration: event.target.value,
        page: 1,
        firstItem: 0,
        lastItem: 11,
      };

      dispatch(setCoursesDisplayPage(1));
      dispatch(fetchCourses(courses));

      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByDuration: true,
        filterByLevel: false,
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

  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={2}
      style={{ overflow: "hidden" }}
    >
      <Grid
        container
        justifyContent={"flex-end"}
        style={{ paddingRight: "10px" }}
        className={classes.addCourseButton}
      >
        <Button variant="contained" onClick={() => navigate("/addCourse")}>
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
        <TableComponents
          rows={rows}
          columns={columns}
          createData={createColumns}
          createRows={createRows}
        />
      </Grid>
      <Grid container justifyContent={"center"}>
        {courses?.totalNumOfCourses &&
        Math.ceil(courses.totalNumOfCourses) > 1 ? (
          <PaginationComponent
            page={page}
            handleChange={handlePagination}
            numberOfPages={Math.ceil(courses.totalNumOfCourses / 12)}
            numberOfItems={Object.keys(courses.data).length}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default AllCourses;
