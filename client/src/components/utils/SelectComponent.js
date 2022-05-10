import { Select, MenuItem } from "@mui/material";

const SelectComponent = ({ handleChange, selectedValue, array, disabled }) => {
  return (
    <Select
      fullWidth
      onChange={handleChange}
      value={selectedValue}
      disabled={disabled}
      style={{
        minWidth: "0px",
        marginTop: "10px",
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: "1px",
      }}
    >
      {array.map((item, index) => {
        return (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectComponent;
