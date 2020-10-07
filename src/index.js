import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store";
import App from "./components/app/App";
import Service from "./service/service";
import ServiceContext from "./components/serviceContext/serviceContext";


const service = new Service();

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


