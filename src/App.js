import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { TextField, Button } from "@mui/material/";
import { format } from "date-fns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ItineraryTable from "./component/ItineraryTable";
import SaveLoadDialogButton from "./component/SaveLoadDialogButton";
import PopoverButton from "./component/PopoverButton";


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("");
  const [tableItems, setTableItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itineraryRecord, setItineraryRecord] = useState([]);
  const [cityTextField, setCityTextField] = useState({
    error: false,
    helperText: "",
  });
  
  const dateChangeListener = (date) => {
    setSelectedDate(date);
  };

  const resetButtonClick = (e) => {
    setSelectedDate(new Date());
    setSelectedCity("");
    setTableItems([]);
    setSelectedItems([]);
    setItineraryRecord([]);
    setCityTextField({
      error: false,
      helperText: "",
    });
  };

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

  const compareMaps = (map1, map2) => {
    if(map1.cityName === map2.cityName && map1.tripDate === map2.tripDate){
      return true;
    }else{
      return false;
    }
  }


  const isRecordNew = (recordArray, object) =>{
    if(recordArray.length == 0){
      return true;
    }
    var flag = true;
    recordArray.forEach((each) =>{
      if(compareMaps(each, object)) flag = false;
    });
    return flag;
  }

  const addTableItem = (cityName, date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const url = `http://localhost:8080/itinerary/weather?city=${cityName}&date=${dateStr}`;

    let tripStop = {
      cityName: cityName,
      tripDate: dateStr,
    }

    if(!isRecordNew(itineraryRecord,tripStop )){
        return;
    }

    //add city name and trip date into itineraryRecord for plan save/load
    setItineraryRecord([
      ...itineraryRecord,
      tripStop,
    ]);
  
    fetch(url)
      .then((response) => response.json())
      .then((response) =>{
        if (response.length === 0) {
          setTableItems([
            ...tableItems,
            {
              city: cityName,
              country: "None",
              temperature: "None",
              cloud: "None",
              dateStr: dateStr,
            },
          ]);
        } else {
          response.forEach((v) => {
            if (v.weatherEntities.length === 0) {
              setTableItems([
                ...tableItems,
                {
                  city: v.cityName,
                  country: v.country,
                  temperature: "None",
                  cloud: "None",
                  dateStr: dateStr,
                },
              ]);
            } else {
              const newTableItems = [];
              v.weatherEntities.forEach((w) => {
                newTableItems.push({
                  city: v.cityName,
                  country: v.country,
                  temperature: w.temperature,
                  cloud: w.cloud,
                  dateStr: w.displayTime,
                });
              });
              setTableItems([...tableItems, ...newTableItems]);
            }
          });
        }
      })
      .catch((error) => {
        console.error("error", error);
        setTableItems([
          ...tableItems,
          {
            city: cityName,
            country: "None",
            temperature: "None",
            cloud: "None",
            dateStr: dateStr,
          },
        ]);
      });

    
  };

  const createItineraryCallback = (newItineraryName) => {
    console.log("createItineraryCallback: ", newItineraryName);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planName: newItineraryName,
        tripStopEntities: itineraryRecord
      }),
    };
    console.log('requestOptions: ', requestOptions); 
    fetch("http://localhost:8080/itinerary/plan/add", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      }) 
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadItineraryCallback = (planId) => {
    console.log("loadItineraryCallback: ", planId);
    fetch(`http://localhost:8080/itinerary/plan/list/${planId}`)
      .then((response) => response.json())
      .then((data) => {
        const existingTableItems = [];
        data.forEach((v) => {
          if (v.weatherEntities.length === 0) {
            existingTableItems.push({
              city: v.cityName,
              country: v.country,
              temperature: "None",
              cloud: "None",
              dateStr: v.displayTripDate,
            });
          } else {
            v.weatherEntities.forEach((w) => {
              existingTableItems.push({
                city: v.cityName,
                country: v.country,
                temperature: w.temperature,
                cloud: w.cloud,
                dateStr: w.displayTime,
              });
            })
          }
        });
        console.log(existingTableItems);
        setTableItems([...existingTableItems]);
      }) 
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const setFilterCallback = (e) => {
    const value = e.target.value;
    setSelectedItems(typeof value === "string" ? value.split(",") : value);
  };


  return (
    <div className="CP-MainContainer">
      <h1 className="CP-AppHeader">Travel Planner</h1>
      <div className="CP-TopToolContainer">
      
        <TextField
          className="CP-l-textfield"
          label="City"
          variant="standard"
          value={selectedCity}
          onChange={cityChangeListener}
          error={cityTextField.error}
          helperText={cityTextField.helperText}
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
          onClick={submitButtonClick}
        >
          Submit
        </Button>
        <SaveLoadDialogButton
          createItineraryCallback={createItineraryCallback}
          loadItineraryCallback={loadItineraryCallback}
        />
        <PopoverButton
          buttonText="Generate Summary"
          popoutText="I am a good popout. Please take an umbralla. Please take a coat. I am a good popout. Please take an umbralla. Please take a coat"
        />
        <Button
          className="CP-l-resetButton"
          size="large"
          variant="contained"
          onClick={resetButtonClick}
        >
          Reset
        </Button>
        </div>
        <div className="CP-TableViewContainer">
        <ItineraryTable
          tableItems={tableItems}
          selectedItems={selectedItems}
          setFilterCallback={setFilterCallback}
        />
      </div>
    </div>
  );
}

export default App;
