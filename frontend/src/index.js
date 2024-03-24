import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import NeuralNetworkVisualization from './components/nn';


const root = ReactDOM.createRoot(document.getElementById('root'));



function Application(){
  return(
  
  <div class="wrapper">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700&display=swap"></link>
    <NeuralNetworkVisualization />
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
