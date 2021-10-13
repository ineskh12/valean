import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "./styles/css/style.css"
import "leaflet/dist/leaflet.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import 'react-notifications/lib/notifications.css';

// Redux
import {Provider} from 'react-redux'
import {store} from "./redux/store";

ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


