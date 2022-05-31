import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCourses,
  fetchMentorCourses,
  fetchUserCourses,
  getFilter,
  getLoggedUserData,
  setFilter,
  setFilterTerm,
} from "../../features/eLearningSlice";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles } from "@material-ui/core";

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
  const navigate = useNavigate();

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
    } else if (
      window.location.pathname === "/dashboard" &&
      loggedUser.user.role === "student"
    ) {
      if (event.target.value === "") {
        const user = {
          userCourses: loggedUser.user.enrolledInCourses,
          param: loggedUser.user._id,
          id: loggedUser.user._id,
          completedCourses: loggedUser.user.completedCourses,
          filterTerm: "",
        };

        dispatch(setFilterTerm(""));
        return dispatch(fetchUserCourses(user));
      }

      if (event.keyCode === 13) {
        const user = {
          userCourses: loggedUser.user.enrolledInCourses,
          param: loggedUser.user._id,
          id: loggedUser.user._id,
          completedCourses: loggedUser.user.completedCourses,
          filterTerm: filter,
        };
        dispatch(setFilterTerm(filter));
        return dispatch(fetchUserCourses(user));
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
