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
    [theme.breakpoints.only("xs")]: {
      maxHeight: "400px",
    },
    [theme.breakpoints.only("md")]: {
      maxHeight: "300px",
    },
    [theme.breakpoints.only("lg")]: {
      height: "500px",
    },
    [theme.breakpoints.only("xl")]: {
      height: "700px",
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
                  key={Math.random() * 100}
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
                  key={index}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={Math.random() * 10}
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
