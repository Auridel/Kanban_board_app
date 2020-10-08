import React from "react";
import {connect} from "react-redux";
import {DELETE_COLUMN} from "../../actions";
import WithService from "../hoc_withService/withService";
import CardList from "../cardsList/cardList";
import AddForm from "../addForm/addForm";
import "./column.scss";
import cancelSvg from "../../assets/img/cancel.svg";


const Column = ({id, title, DELETE_COLUMN, service}) => {
    const deleteColumn = (id, title) => {
        if(window.confirm(`Вы действительно хотите удалить колонку ${title}?`)){
            DELETE_COLUMN(id);
            service.deleteColumn(id)
                .then(() => {
                    console.log("column deleted")
                })
                .catch(() => {
                    console.log("col delete err")
                })
        }
    };

    return(
        <div className="column">
            <h2 className="column__header">{title}</h2>
            <button
                onClick={() => {
                    deleteColumn(id, title);
                }}
                className="column__delete">
                <img className="cancel-icon" src={cancelSvg} alt="cancel-icon"/>
            </button>
            <CardList
                service={service}
                columnId={id}/>
            <AddForm columnId={id} newColumn={false}/>
        </div>
    )
};


const mapDispatchToProps = {
    DELETE_COLUMN
};

export default WithService()(connect(null, mapDispatchToProps)(Column));