import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    overflowX: "none",
    [theme.breakpoints.only("xs")]: {
      maxHeight: "400px",
    },
    [theme.breakpoints.only("md")]: {
      maxHeight: "300px",
    },
    [theme.breakpoints.only("lg")]: {
      maxHeight: "500px",
    },
    [theme.breakpoints.only("xl")]: {
      maxHeight: "500px",
    },
  },
}));

const TableComponent = ({ columns, createData, createRows, rows }) => {
  const classes = useStyles();
  createData();
  createRows();

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        overflowX: "none",
        marginBottom: "50px",
      }}
    >
      <TableContainer className={classes.table}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={Math.floor(Math.random() * 1000)}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: "grey" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  style={{
                    padding: "0 !important",
                    height: "90px",
                    wordBreak: "break",
                  }}
                  key={Math.floor(Math.random() * 10000)}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={Math.floor(Math.random() * 100000)}
                        align={column.align}
                        style={{ wordBreak: "break-all" }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableComponent;
