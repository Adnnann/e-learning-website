import { useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Tooltip } from "@mui/material";
import TableComponents from "../utils/Table";
import {
  getAllUsers,
  getLoggedUserData,
  setFilter,
} from "../../features/eLearningSlice";
import Checkbox from "@mui/material/Checkbox";
import { Grid } from "@mui/material";
import SelectComponent from "../utils/SelectComponent";

const Users = () => {
  const users = useSelector(getAllUsers);
  const loggedUser = useSelector(getLoggedUserData);
  const rows = [];

  const [filters, setFilters] = useState({
    firstNameFilterStatus: true,
    lastNameFilterStatus: false,
    firstNameSortBy: "",
    lastNameSortBy: "A-Z",
    firstNameFilter: "A-Z",
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
    if (users?.users) {
      _.chain(
        Object.values(users.users).filter(
          (item) => item.firstName !== loggedUser.user.firstName
        )
      )
        .orderBy(
          [(user) => user.firstName.toLowerCase()],
          [filters.firstNameSortBy]
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
            createColumns(firstCol, secondCol, thirdCol, fourthCol, fifthCol)
          );
        })
        .value();
    }
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    if (name === "firstNameFilter") {
      setFilters({
        ...filters,
        [name]: event.target.value,
        firstNameFilterStatus: true,
        firstNameSortBy: event.target.value === "A-Z" ? "asc" : "desc",
      });
    }
  };

  const orderBy = ["A-Z", "Z-A"];

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12} md={9} lg={9} xl={9} style={{ marginTop: "10px" }}>
        <Grid item xs={12} md={2} lg={2} xl={2} style={{ marginTop: "10px" }}>
          <SelectComponent
            array={orderBy}
            selectedValue={filters.firstNameFilter}
            handleChange={handleChange("firstNameFilter")}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} md={9} lg={9} xl={9} style={{ marginTop: "10px" }}>
        {users?.users ? (
          <TableComponents
            rows={rows}
            columns={columns}
            createData={createColumns}
            createRows={createRows}
          />
        ) : (
          "Loading..."
        )}
      </Grid>
    </Grid>
  );
};

export default Users;
