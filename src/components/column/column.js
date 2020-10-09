import React from "react";
import CardList from "../cardsList/cardList";
import AddForm from "../addForm/addForm";
import "./column.scss";
import cancelSvg from "../../assets/img/cancel.svg";


const Column = ({id, title, deleteColumn}) => {


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
                    columnId={id}/>
            <AddForm columnId={id} newColumn={false}/>
        </div>
    )
};




export default Column;