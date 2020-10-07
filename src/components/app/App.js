import React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import "./app.scss";
import {GET_ENTRIES} from "../../actions";
import Column from "../column/column";
import AddForm from "../addForm/addForm";
import WithService from "../hoc_withService/withService";

import data from "../../db"

const App = ({service, loaded, entries, GET_ENTRIES}) => {

    useEffect(() => {
        if(!loaded) {
            if(!window.localStorage.getItem("data")){
                window.localStorage.setItem("data", JSON.stringify(data.entries));
                GET_ENTRIES(data.entries);
            }
            else {
                GET_ENTRIES(JSON.parse(window.localStorage.getItem("data")));
            }
            // service.getColumns()
            //     .then((res) => {
            //         GET_ENTRIES(res);
            //     })
            //     .catch((err) => {
            //         console.log("error " + err);
            //     });
        }
        window.localStorage.setItem("data", JSON.stringify(entries));
    });

    return(
      <div className="main-screen">
          {
              loaded ? entries.map((item, idx) => {
                  const {title}=item;
                  return (
                      <Column key={idx} title={title} id={idx}/>
                  )
              }) : ""
          }
          <AddForm columnId={entries.length + 1} newColumn={true}/>
      </div>
    )
};

const mapStateToProps = (state) => {
    return{
        loaded: state.loaded,
        entries: state.entries
    }
};
const mapDispatchToProps = {
    GET_ENTRIES
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(App));