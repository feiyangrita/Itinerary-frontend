import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material/';
import { StyledEngineProvider } from '@mui/material/styles';
import MultiSelector from './MultiSelector'
import PropTypes from 'prop-types';

const ItineraryTable = (props) => {
   const {selectedItems, setFilterCallback, tableItems} = props;

   return (
      <React.Fragment>
         <div className='CP-l-FilterButtonContainer'>
            <StyledEngineProvider injectFirst>
               <MultiSelector tableItems={tableItems
                  .map((item) => item.city + '_' + item.country)
                  .filter((value, index, self) => self.indexOf(value) === index)}
                  filterItems={selectedItems} setFilterCallback={setFilterCallback} />
            </StyledEngineProvider>
         </div>
         <div className='CP-l-TableContainer'>
            <TableContainer component={Paper}>
               <Table aria-label="Itinerary Table">
                  <TableHead>
                     <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Country</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Temperature (°C）</TableCell>
                        <TableCell align="center">Cloud</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {tableItems.filter((v) => selectedItems.length === 0 || selectedItems.indexOf(v.city + '_' + v.country) >= 0)
                        .map((item, index) => (
                           <TableRow key={index} >
                              <TableCell component="th" scope="row">{index}</TableCell>
                              <TableCell align="center">{item.city}</TableCell>
                              <TableCell align="center">{item.country}</TableCell>
                              <TableCell align="center">{item.dateStr}</TableCell>
                              <TableCell align="center">{item.temperature}</TableCell>
                              <TableCell align="center">{item.cloud}</TableCell>
                           </TableRow>
                        ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </div>
      </React.Fragment>
   );
}

ItineraryTable.propTypes = {
   tableItems: PropTypes.array.isRequired,
   selectedItems: PropTypes.array.isRequired,
   setFilterCallback: PropTypes.func.isRequired
};

export default ItineraryTable;