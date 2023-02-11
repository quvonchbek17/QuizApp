import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'  
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from "react-redux";
import store from "./rt/index.js";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

// api.php?amount=5&category=0&difficulty=easy&type=multiple
axios.defaults.baseURL =
  "https://opentdb.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
    <App />

    </Provider>
  </Router>,
)
