import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import TableComponents from "../utils/Table";
import {
  getLoggedUserData,
  getUsers,
  getUsersDisplayPage,
  setUsersDisplayPage,
  fetchUsers,
  setUserToEdit,
} from "../../features/eLearningSlice";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const page = useSelector(getUsersDisplayPage);
  const loggedUser = useSelector(getLoggedUserData);
  const rows = [];

  const [filters, setFilters] = useState({
    sortByFirstname: false,
    sortByLastname: false,
    filterByStatus: true,
    sortFirstname: "",
    sortLastname: "",
    filterStatus: "All",
  });

  const columns = [
    {
      id: "firstName",
      label: "First Name",
      minWidth: 90,
      align: "center",
    },
    {
      id: "lastName",
      label: "Last Name",
      maxWidth: 220,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 160,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "role",
      label: "Role",
      minWidth: 120,
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

  const createColumns = (firstName, lastName, email, role, edit) => {
    return { firstName, lastName, email, role, edit };
  };

  const createRows = () => {
    if (users?.data) {
      _.chain(
        Object.values(users.data)
          .filter((item) => item.firstName !== loggedUser.user.firstName)

          .filter((item) =>
            filters.filterStatus === "All"
              ? item.role === "mentor" || item.role === "student"
              : filters.filterStatus === "isMentor"
              ? item.role === "mentor"
              : filters.filterStatus === "isStudent"
              ? item.role === "student"
              : null
          )
      )

        .orderBy(
          [
            filters.sortByFirstname
              ? (user) => user.firstName.toLowerCase()
              : filters.sortByLastname
              ? (user) => user.lastName.toLowerCase()
              : null,
          ],
          [
            filters.sortByFirstname
              ? filters.sortFirstname === "A-Z"
                ? "asc"
                : "desc"
              : filters.sortByLastname
              ? filters.sortLastname === "A-Z"
                ? "asc"
                : "desc"
              : null,
          ]
        )

        .map((item) => {
          const firstCol = <div>{item.firstName}</div>;
          const secondCol = <div>{item.lastName}</div>;
          const thirdCol = <div>{item.email}</div>;
          const fourthCol = (
            <span>
              <Checkbox />
              {item.role === "mentor"
                ? "isMentor"
                : item.role === "student"
                ? "isStudent"
                : "admin"}
            </span>
          );
          const fifthCol = (
            <span>
              <Tooltip title="Edit user data">
                <EditOutlinedIcon
                  fontSize="small"
                  onClick={() => edit(item._id)}
                />
              </Tooltip>

              <Tooltip title="Delete user" style={{ marginLeft: "20px" }}>
                <DeleteOutlineOutlinedIcon
                  //onClick={() => dispatch(deleteAuthor(item._id))}
                  fontSize="small"
                />
              </Tooltip>
            </span>
          );

          rows.push(
            createColumns(firstCol, secondCol, thirdCol, fourthCol, fifthCol)
          );
        })
        .value();
    }
  };

  const edit = (id) => {
    dispatch(setUserToEdit(id));
    navigate("/editProfile");
  };

  const handlePagination = (event, value) => {
    const users = {
      firstItem: value * 12 - 11,
      lastItem: value * 12,
    };

    dispatch(setUsersDisplayPage(value));
    dispatch(fetchUsers(users));
  };

  const handleChange = (name) => (event) => {
    console.log(name);
    console.log(event.target.value);
    if (name === "sortFirstname") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        sortByFirstname: true,
        sortByLastname: false,
      });
    } else if (name === "sortLastname") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        sortByFirstname: false,
        sortByLastname: true,
      });
    } else if (name === "filterStatus") {
      setFilters({
        ...filters,
        [name]: event.target.value,
      });
    }
  };

  const filterItems = [
    ["A-Z", "Z-A"],
    ["A-Z", "Z-A"],
    ["All", "isMentor", "isStudent"],
  ];

  const filterByTitles = [
    "Sort By Firstmame",
    "Sort By Lastname",
    "Filter By Status",
  ];

  const filterBy = ["sortFirstname", "sortLastname", "filterStatus"];

  return (
    <>
      <Grid container justifyContent={"center"} style={{ overflow: "hidden" }}>
        {Object.values(filterItems).map((item, index) => {
          return (
            <Grid
              key={Math.random() + 1}
              item
              xs={12}
              md={2}
              lg={2}
              xl={2}
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

        <Grid item xs={12} md={10} lg={10} xl={9} style={{ marginTop: "10px" }}>
          <TableComponents
            rows={rows}
            columns={columns}
            createData={createColumns}
            createRows={createRows}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        {users?.totalNumOfCourses && Math.ceil(users.totalNumOfCourses) > 1 ? (
          <PaginationComponent
            page={page}
            handleChange={handlePagination}
            numberOfPages={Math.ceil(users.totalNumOfCourses / 12)}
            numberOfItems={Object.keys(users.data).length}
          />
        ) : null}
      </Grid>
    </>
  );
};

export default AllUsers;
