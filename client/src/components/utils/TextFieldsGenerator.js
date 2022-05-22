import { Button, TextField, Grid } from "@mui/material";
import _ from "lodash";

export default function TextFieldsGenerator({
  array,
  handleChange,
  values,
  value,
  className,
  labels,
  types,
}) {
  return (
    <>
      {array.map((item, index) => (
        <Grid key={item} item>
          <br />
          {/* {_.chain(item).kebabCase().replace("-", "").startCase().value()} */}
          <div className={className}>
            <TextField
              label={labels[index]}
              autoFocus={false}
              fullWidth
              onChange={handleChange(item)}
              value={values[value[index]]}
              type={types[index]}
            />
          </div>
        </Grid>
      ))}
    </>
  );
}
