import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./store";
import App from "./components/app/App";
import ErrorCatcher from "./components/errorCatcher/errorCatcher";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ErrorCatcher>
            <App/>
        </ErrorCatcher>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


