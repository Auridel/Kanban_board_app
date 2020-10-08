import React from "react";
import "./card.scss";
import cancelSvg from "../../assets/img/cancel.svg";
import {Draggable} from "react-beautiful-dnd";


const Card = ({text, columnId, cardId, onDelete, index}) => {

    return (
        <Draggable draggableId={`${cardId}`} index={index}>
            {(provided) =>
                <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="card">
                    {text}
                    <button
                        onClick={() => onDelete(columnId, cardId)}
                        className="card__delete">
                        <img className="card__delete-icon" src={cancelSvg} alt="cancel-icon"/>
                    </button>
                </li>
            }
        </Draggable>
    )
};



export default Card;