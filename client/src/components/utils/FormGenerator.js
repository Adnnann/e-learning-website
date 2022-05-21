import { Button, TextField, Grid } from "@mui/material";
import _ from "lodash";

export default function FormGenerator({ array, handleChange, values, value }) {
  return (
    <>
      {array.map((item, index) => (
        <Grid key={item} item>
          <br />
          {_.chain(item).kebabCase().replace("-", "").startCase().value()}
          <div
            style={{
              borderStyle: "solid",
              borderColor: "grey",
              borderWidth: "1px",
            }}
          >
            <TextField
              autoFocus={false}
              fullWidth
              onChange={handleChange(item)}
              value={values[value[index]]}
            />
          </div>
          <br />
        </Grid>
      ))}
    </>
  );
}
