import logo from './logo.svg';
import './App.css';
import { TextField, Button } from "@mui/material/";


function App() {
  return (
    <div>
      <h1>Travel Planner</h1>
      <div>
        <TextField label="City" variant="standard"/>

        <Button
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
