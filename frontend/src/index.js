import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Cookie from './components/Cookie';
import NeuralNetworkVisualization from './components/nn';
import { Slider } from '@mui/material';
import Sliders from './components/Slider';
import p from "./usermodel.js"

const myFirstElement = <h1>Hello React!</h1>

const root = ReactDOM.createRoot(document.getElementById('root'));


p()
  .then(userId => {
    console.log('User ID:', userId);
    // Perform any other initialization tasks here
  })
  .catch(error => console.error('Error:', error));

function Application(){
  return(
  <div>
    <NeuralNetworkVisualization/>
    <Sliders />
    <Cookie />
  </div>
  )
}


root.render(
  <Application />
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
