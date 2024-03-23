import React from 'react';
//import './Slider.css'; // Importing the CSS file
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './Slider.css';


export function numhiddenlayers(value) {
    console.log(value)
    return value;
 }


function sizehiddenlayer(value) {
   return `${value}`;
}


export default function Sliders() {
   return (
       <div className='Slider-container' >
           <Box sx={{ width: 100 }}>
               <Slider
                   aria-label="Temperature"
                   defaultValue={1}
                   getAriaValueText={numhiddenlayers}
                   onChange={(_, value) => numhiddenlayers(value)}
                   valueLabelDisplay="auto"
                   shiftStep={2}
                   step={1}
                   marks
                   min={1}
                   max={4}
               />
               <Slider
                   aria-label="Temperature"
                   defaultValue={30}
                   getAriaValueText={sizehiddenlayer}
                   onChange={(_, value) => sizehiddenlayer(value)}
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
