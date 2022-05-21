import * as React from "react";
import { Pagination } from "@mui/material/";

export default function PaginationComponent({
  numberOfPages,
  handleChange,
  page,
}) {
  return (
    <div style={{ margin: "0 auto", marginTop: "20px" }}>
      <Pagination
        key={page}
        count={numberOfPages}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
