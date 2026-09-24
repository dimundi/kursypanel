import React from "react";
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import './index.css';
import '@fortawesome/fontawesome-free/js/all.js';
import {Router} from './components/layout/Router';

import './App.scss';

// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//       <Router />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
