import React from "react";
import CardList from "../cardsList/cardList";
import AddForm from "../addForm/addForm";
import "./column.scss";

const Column = ({id, title}) => {
    return(
        <div className="column">
            <h2 className="column__header">{title}</h2>
            <CardList columnId={id}/>
            <AddForm columnId={id}/>
        </div>
    )
};

export default Column;