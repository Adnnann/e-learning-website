import * as React from "react";
import { useState } from "react";
import { Pagination, Grid } from "@mui/material/";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersDisplayPage,
  setUsersDisplayPage,
} from "../../features/eLearningSlice";

export default function PaginationComponent({
  numberOfPages,
  handleChange,
  page,
}) {
  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={3} lg={3} xl={3}>
        <div style={{ marginLeft: "auto", marginTop: "20px" }}>
          <Pagination
            key={page}
            count={numberOfPages}
            page={page}
            onChange={handleChange}
            style={{ marginLeft: "auto" }}
          />
        </div>
      </Grid>
    </Grid>
  );
}
