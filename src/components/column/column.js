import React from "react";
import CardList from "../cardsList/cardList";
import "./column.scss";

const Column = ({id, title}) => {
    return(
        <div className="column">
            <h2>{title}</h2>
            <CardList columnId={id}/>
            <button>Добавить еще одну карточку</button>
        </div>
    )
};

export default Column;