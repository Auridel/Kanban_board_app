import React from "react";
import "./card.scss";
import cancelSvg from "../../assets/img/cancel.svg";

const Card = ({text, columnId, cardId, onDelete}) => {

    return (
        <div className="card">
            {text}
            <button
                onClick={() => onDelete(columnId, cardId)}
                className="card__delete">
                <img className="card__delete-icon" src={cancelSvg} alt="cancel-icon"/>
            </button>
        </div>
    )
};



export default Card;