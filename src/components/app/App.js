import React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import "./app.scss";
import {GET_ENTRIES} from "../../actions";
import Column from "../column/column";
import WithService from "../withService/withService";

const App = ({service, loaded, entries, GET_ENTRIES}) => {


    useEffect(() => {
        console.log("render");
        if(!loaded) {
            service.getColumns()
                .then((res) => {
                    GET_ENTRIES(res);
                })
                .catch((err) => {
                    console.log("error " + err);
                });
        }
    }, [loaded]);

    console.log(entries)

    return(
      <div className="main-screen">
          {
              loaded ? entries.map(item => {
                  const {title, index}=item;
                  return (
                      <Column key={index} title={title} id={index}/>
                  )
              }) : ""
          }
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