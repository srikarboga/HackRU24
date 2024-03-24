import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import NeuralNetworkVisualization from './components/nn';
import { fetchUserData } from './user.js';

const root = ReactDOM.createRoot(document.getElementById('root'));


fetchUserData()
  .then(user_id => {
    console.log("haha", user_id);
  })
  .catch(error => {
    // Handle error if needed
  });

function Application(){
  return(
  <div class="wrapper">
    <NeuralNetworkVisualization/>
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
