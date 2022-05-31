import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  getLoggedUserData,
  getUsers,
  getUsersDisplayPage,
  setUsersDisplayPage,
  fetchUsers,
  setUserToEdit,
  activateAccount,
  getActivateAccountMessage,
  cleanActivateAccountMessage,
} from "../../features/eLearningSlice";
import { Grid, Checkbox, Tooltip } from "@mui/material";
import SelectComponent from "../utils/SelectComponent";
import PaginationComponent from "../utils/Pagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  selectFields: {
    height: "60px",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: "1px",
  },
  tooltips: {
    marginLeft: "20px",
  },
  tableContainer: { marginTop: "10px !important" },
  selectFieldsContainer: {
    marginTop: "10px",
    marginLeft: "10px !important",
  },
}));

const AllUsers = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const page = useSelector(getUsersDisplayPage);
  const loggedUser = useSelector(getLoggedUserData);
  const activateAccountMessage = useSelector(getActivateAccountMessage);
  const rows = [];

  useEffect(() => {
    if (activateAccountMessage?.message) {
      const users = {
        firstValue: 1,
        lastValue: 12,
      };

      dispatch(fetchUsers(users));
      dispatch(cleanActivateAccountMessage());
    }
  }, [activateAccountMessage]);

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
      minWidth: 120,
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
      minWidth: 100,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "edit",
      label: null,
      minWidth: 60,
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
              <Tooltip title="Activate or deactivate account">
                <Checkbox
                  onChange={() => activateUserAccount(item._id)}
                  checked={item.active ? true : false}
                />
              </Tooltip>
              {item.role === "mentor"
                ? "isMentor"
                : item.role === "student"
                ? "isStudent"
                : "admin"}
            </span>
          );
          const fifthCol = (
            <Tooltip title="Edit user data">
              <EditOutlinedIcon
                fontSize="small"
                onClick={() => edit(item._id)}
              />
            </Tooltip>
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

  const activateUserAccount = (id) => {
    dispatch(activateAccount(id));
  };

  return (
    <>
      <Grid container justifyContent={"center"} style={{ overflow: "hidden" }}>
        {Object.keys(users).length !== 0 &&
          Object.values(filterItems).map((item, index) => {
            return (
              <Grid
                key={Math.random() + 1}
                item
                xs={12}
                md={2}
                lg={2}
                xl={2}
                className={classes.selectFieldsContainer}
              >
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

        <Grid
          item
          xs={12}
          md={10}
          lg={10}
          xl={9}
          className={classes.tableContainer}
        >
          <TableComponents
            rows={rows}
            columns={columns}
            createData={createColumns}
            createRows={createRows}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>
        {users?.data && Math.ceil(users.totalNumOfUsers / 12) > 1 ? (
          <PaginationComponent
            page={page}
            handleChange={handlePagination}
            numberOfPages={Math.ceil(users.totalNumOfUsers / 12)}
            numberOfItems={Object.keys(users.data).length}
          />
        ) : null}
      </Grid>
    </>
  );
};

export default AllUsers;
