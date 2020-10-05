import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store";
import App from "./components/app/App";
import service from "./service/service";
import ServiceContext from "./components/serviceContext/serviceContext";



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ServiceContext.Provider value={service}>
            <App />
        </ServiceContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


