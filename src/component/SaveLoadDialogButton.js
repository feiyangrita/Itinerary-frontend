import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Input from '@mui/material/Input';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

import { BASE_URL } from '../utils/url'

// const itineraryNames = ['itinerary1', 'itinerary2'];

const SimpleDialog = (props) => {
   const [itineraryName, setItineraryName] = useState('');
   const { open, setOpen, itineraryArray, createItinerary, loadItinerary} = props;

   const handleLoadItinerary = (value) => { 
      loadItinerary(value);
      setOpen(false);
   };

   const handleItineraryNameChange = (e) => {
      console.log('handleItineraryNameChange', e.target.value);
      setItineraryName(e.target.value);
   }
   
   const handleCreateItinerary = ()=> {
      createItinerary(itineraryName);
      setOpen(false);
   }

   const onClose = ()=> {
      setOpen(false);
   }

   return (
      <Dialog open={open} onClose={onClose}>
         <DialogTitle>Save/Load Itinerary</DialogTitle>
         <List sx={{ pt: 0 }}>
            {itineraryArray.map((oPlan) => (
               <Tooltip title='Click to load saved itinerary' placement='top' key={oPlan.id}>
               <ListItem button onClick={() => handleLoadItinerary(oPlan.id)} key={oPlan.id}>
                  <ListItemAvatar>
                     <Avatar sx={{ bgcolor: blue[100], color: blue[600], fontSize: 16, height: 30, width: 30, ml: 1 }}>
                        <CloudDownloadIcon />
                     </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={oPlan.planName} />
               </ListItem>
               </Tooltip>
            ))}
         </List>
         <div style={{marginBottom: '9px', paddingLeft: '4px'}}>
            <Tooltip title='Click to save itinerary' placement='top'>
               <IconButton size='small' onClick={handleCreateItinerary}>
                  <Avatar sx={{ fontSize: 16, height: 30, width: 30 }}>
                     <AddIcon />
                  </Avatar>
               </IconButton>
            </Tooltip>
            <Input placeholder='New Plan Name' sx={{ml: 2, pl: 1, pr:2, mr:2, width: 160}} onChange={handleItineraryNameChange} />
         </div>
      </Dialog>
   );
}

SimpleDialog.propTypes = {
   open: PropTypes.bool.isRequired,
   setOpen: PropTypes.func.isRequired,
   createItinerary: PropTypes.func.isRequired,
   loadItinerary: PropTypes.func.isRequired
};

const SaveLoadDialogButton = (props) => {
   const {createItineraryCallback, loadItineraryCallback} = props;
   const [open, setOpen] = useState(false);
   const [itineraryArray, setItineraryArray] = useState([]);

   const handleClickOpen = () => {
      fetch(`${BASE_URL}/itinerary/plan/list`)
      .then((response) => response.json())
      .then((response) =>{
         const existingItineraryArray = [];
         response.forEach((v) => {
            existingItineraryArray.push({
               id:v.id,
               planName:v.planName
            });
         });
         setItineraryArray(existingItineraryArray);
      })
      .catch((error) => {
        console.error("error", error);
      });
      setOpen(true);
   }

   return (
      <React.Fragment>
         <Button className='CP-l-saveLoadButton' variant="outlined" onClick={handleClickOpen}>
            Save/Load
         </Button>
         <SimpleDialog
            open={open}
            setOpen={setOpen}
            createItinerary={createItineraryCallback}
            loadItinerary={loadItineraryCallback}
            itineraryArray={itineraryArray}
         />
      </React.Fragment>
   );
}

SaveLoadDialogButton.propTypes = {
   createItineraryCallback: PropTypes.func.isRequired,
   loadItineraryCallback: PropTypes.func.isRequired
};

export default SaveLoadDialogButton;