import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import TableComponents from "../utils/Table";
import {
  fetchCourses,
  getAllCourses,
  getCourses,
  getCoursesDisplayPage,
  getLoggedUserData,
  getUsers,
  setCoursesDisplayPage,
} from "../../features/eLearningSlice";
import { Grid } from "@mui/material";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";

const AllCourses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(getCourses);
  const page = useSelector(getCoursesDisplayPage);
  const users = useSelector(getUsers);
  const loggedUser = useSelector(getLoggedUserData);
  const rows = [];

  const handlePagination = (event, value) => {
    const courses = {
      page: value,
      firstItem: value * 12 - 11,
      lastItem: value * 12,
    };

    dispatch(setCoursesDisplayPage(value));
    dispatch(fetchCourses(courses));
    //to dispatch and filter in mongoose all values between
    //value * 12 - 11, value * 12
    // and
    //value * 12 - (value * 12 - 11)
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
              ? (course) => course.level.toLowerCase()
              : filters.filterByMentorName
              ? (course) => course.level.toLowerCase()
              : null,
          ],
          [
            filters.filterByTitle
              ? filters.filterByTitle === "A-Z"
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
          const secondCol = (
            <div>
              {`${
                Object.values(users.data).filter(
                  (user) => user._id === item.mentorId
                )[0].firstName
              } ${
                Object.values(users.data).filter(
                  (user) => user._id === item.mentorId
                )[0].lastName
              }`}
            </div>
          );
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
              <Tooltip title="Edit book">
                <EditOutlinedIcon
                  fontSize="small"
                  //onClick={() => edit(item.Id, item.Name)}
                />
              </Tooltip>

              <Tooltip title="Delete book" style={{ marginLeft: "20px" }}>
                <DeleteOutlineOutlinedIcon
                  //onClick={() => dispatch(deleteAuthor(item._id))}
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
    if (name === "filterTitle") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: true,
        filterByMentorName: false,
        filterByDuration: false,
        filterByLevel: false,
      });
    } else if (name === "filterMentorName") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: false,
        filterByMentorName: true,
        filterByDuration: false,
        filterByLevel: false,
      });
    } else if (name === "filterLevel") {
      if (event.target.value === "All levels") {
        return setFilters({
          ...filters,
          filterByTitle: false,
          filterByMentorName: false,
          filterByDuration: false,
          filterByLevel: false,
        });
      }

      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: false,
        filterByMentorName: false,
        filterByDuration: false,
        filterByLevel: true,
      });
    } else {
      console.log(event.target.value);
      setFilters({
        ...filters,
        [name]: event.target.value,
        filterByTitle: false,
        filterByMentorName: false,
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

  return (
    <Grid container justifyContent={"center"} style={{ overflow: "hidden" }}>
      {Object.values(filterItems).map((item, index) => {
        return (
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={1}
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            {filterByTitles[index]}
            <SelectComponent
              array={filterItems[index]}
              selectedValue={filters[filterBy[index]]}
              handleChange={handleChange(filterBy[index])}
            />
          </Grid>
        );
      })}

      <Grid item xs={12} md={9} lg={9} xl={9} style={{ marginTop: "10px" }}>
        <TableComponents
          rows={rows}
          columns={columns}
          createData={createColumns}
          createRows={createRows}
        />
      </Grid>
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
  );
};

export default AllCourses;
