import React from 'react';
//import './Slider.css'; // Importing the CSS file
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Slider.css';


function numhiddenlayers(value) {
   return `${value}°C`;
 }


function sizehiddenlayer(value) {
   return `${value}°C`;
}


export default function Sliders() {
   return (
       <div className='Slider-container' >
           <Box sx={{ width: 100 }}>
               <Slider
                   aria-label="Temperature"
                   defaultValue={30}
                   getAriaValueText={numhiddenlayers}
                   valueLabelDisplay="auto"
                   shiftStep={30}
                   step={10}
                   marks
                   min={10}
                   max={110}
               />
               <Slider
                   aria-label="Temperature"
                   defaultValue={30}
                   getAriaValueText={sizehiddenlayer}
                   valueLabelDisplay="auto"
                   shiftStep={30}
                   step={10}
                   marks
                   min={10}
                   max={110}
               />
           </Box>
       </div>
   );
}
