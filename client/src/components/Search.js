import * as React from "react";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material";
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

export default function Search({ filter }) {
  const classes = useStyles();

  return (
    <TextField
      // onChange={(e)=>filter(e)}
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
