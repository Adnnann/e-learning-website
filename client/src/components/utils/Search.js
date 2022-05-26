import * as React from "react";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  getFilter,
  setFilter,
} from "../../features/eLearningSlice";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "grey",
    borderRadius: "15px",
    paddingLeft: "5px",
    width: "90%",
    backgroundColor: "white",
    [theme.breakpoints.only("xs")]: {
      width: "90%",
    },
  },
}));

export default function Search({ changeHandler }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleKeyPress = (event) => {
    if (
      window.location.pathname === "/admin/courses" ||
      window.location.pathname === "/courses"
    ) {
      if (event.target.value === "") {
        const courses = {
          filterTerm: "",
        };
        return dispatch(fetchCourses(courses));
      }

      if (event.keyCode === 13) {
        const courses = {
          filterTerm: filter,
        };

        return dispatch(fetchCourses(courses));
      }
    }
  };

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <TextField
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="standard"
      className={classes.searchInput}
    />
  );
}
