import * as React from "react";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  fetchMentorCourses,
  getFilter,
  getLoggedUserData,
  setFilter,
  setFilterTerm,
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
  const loggedUser = useSelector(getLoggedUserData);

  const handleKeyPress = (event) => {
    if (
      window.location.pathname === "/admin/courses" ||
      window.location.pathname === "/courses"
    ) {
      if (event.target.value === "") {
        const courses = {
          filterTerm: "",
        };
        dispatch(setFilterTerm(""));
        return dispatch(fetchCourses(courses));
      }

      if (event.keyCode === 13) {
        const courses = {
          filterTerm: filter,
        };

        dispatch(setFilterTerm(filter));

        return dispatch(fetchCourses(courses));
      }
    } else if (
      window.location.pathname === "/dashboard" &&
      loggedUser.user.role === "mentor"
    ) {
      if (event.target.value === "") {
        const courses = {
          mentorId: loggedUser.user._id,
          filterTerm: "",
        };
        dispatch(setFilterTerm(""));
        return dispatch(fetchMentorCourses(courses));
      }

      if (event.keyCode === 13) {
        const courses = {
          mentorId: loggedUser.user._id,
          filterTerm: filter,
        };
        dispatch(setFilterTerm(filter));
        return dispatch(fetchMentorCourses(courses));
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
