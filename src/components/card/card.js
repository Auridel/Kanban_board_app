import React from "react";
import "./card.scss";

const Card = ({text}) => {
    return (
        <div className="card">
            {text}
        </div>
    )
};

export default Card;