import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import "./styles.css";
import "./reset.css";

import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { ToastContainer } from "react-toastify";


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// ReactDOM.render(<App />, document.getElementById("root"));

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <div>
    <App />
    <ToastContainer />
  </div>
);