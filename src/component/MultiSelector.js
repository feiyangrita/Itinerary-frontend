import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from 'prop-types';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 310,
      padding: 5,
    },
  },
};

const MultiSelector = (props) => {
  const { tableItems, filterItems, setFilterCallback } = props;

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multiple-checkbox-label">City Filter</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={filterItems}
        onChange={setFilterCallback}
        input={<OutlinedInput label="City Filter" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {tableItems.map((city) => (
          <MenuItem key={city} value={city}>
            <Checkbox checked={filterItems.indexOf(city) > -1} />
            <ListItemText primary={city} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

MultiSelector.propTypes = {
    tableItems:PropTypes.array.isRequired,
    filterItems:PropTypes.array.isRequired,
    setFilterCallback: PropTypes.func.isRequired
};

export default MultiSelector;
