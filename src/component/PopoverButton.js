import React, {useState} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const PopoverButton = (props) => {
   const {buttonText, popoutText} = props;
   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (e) => {
      setAnchorEl(e.currentTarget);
   }

   const handleClose = (e) => {
      setAnchorEl(null);
   }

   return (
      <React.Fragment>
         <Button className='CP-l-summaryButton' aria-describedby='CP-GenerateSummary' variant="contained" onClick={handleClick}>
            {buttonText}
         </Button>
         <Popover
            id='CP-GenerateSummary'
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'left',
            }}
         >
            <Typography sx={{ p: 2, width: 'auto', 'min-width': 300, 'max-width': 500 }}>{popoutText}</Typography>
         </Popover>
      </React.Fragment>
   );
}

PopoverButton.propTypes = {
   buttonText:PropTypes.string.isRequired,
   popoutText:PropTypes.string.isRequired
}

export default PopoverButton;