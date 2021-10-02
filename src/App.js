import logo from './logo.svg';
import './App.css';
import { TextField, Button } from "@mui/material/";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const cityChangeListener = (e) => {
    setSelectedCity(e.target.value);
    setCityTextField({
      error: false,
      helperText: "",
    });
  };

  const submitButtonClick = (e) => {
    if (selectedCity === "") {
      setCityTextField({
        error: true,
        helperText: "Empty city name",
      });
    } else if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      addTableItem(selectedCity, selectedDate);
    }
  };
  return (
    <div className="CP-MainContainer">
      <h1 className="CP-AppHeader">Travel Planner</h1>
      <div className="CP-TopToolContainer">
        <TextField 
          className="CP-l-textfield"
          label="City" 
          variant="standard"
        />

          <div className="CP-l-datepicker">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Travel Date"
              inputFormat="dd/MM/yyyy"
              value={selectedDate}
              onChange={dateChangeListener}
              minDate={new Date()}
              renderInput={(params) => (
                <TextField variant="standard" {...params} />
              )}
            />
          </LocalizationProvider>
        </div>
        <Button
          className="CP-l-submitButton"
          size="large"
          variant="contained"
        >
          Submit
        </Button>
    </div>
  </div>
  );
}

export default App;
