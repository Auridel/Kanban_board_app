import React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import "./app.scss";
import {GET_ENTRIES} from "../../actions";
import Column from "../column/column";
import AddForm from "../addForm/addForm";
import WithService from "../hoc_withService/withService";



const App = ({service, loaded, entries, GET_ENTRIES}) => {

    useEffect(() => {
        if(!loaded) {
            service.getColumns()
                .then((res) => {
                    GET_ENTRIES(res);
                })
                .catch((err) => {
                    console.log("error " + err);
                });
        }
    });

    return(
      <div className="main-screen">
          {
              loaded ? entries.map((item) => {
                  const {title}=item;
                  return (
                      <Column key={item.id} title={title} id={item.id}/>
                  )
              }) : ""
          }
          <AddForm columnId={null} newColumn={true}/>
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