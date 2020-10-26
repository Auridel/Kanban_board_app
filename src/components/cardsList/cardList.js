import React from "react";
import {connect} from "react-redux";
import {DELETE_CARD} from "../../actions";
import Card from "../card/card";
import "./cardList.scss";
import {Droppable} from "react-beautiful-dnd";

const CardList = ({cards, columnId, DELETE_CARD}) => {

    const deleteCard = (cardId) =>{
        DELETE_CARD(cardId);
    };


    return(
        <Droppable droppableId={`${columnId}`}>
            {(provided) =>
                <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                    className="card-list">
                    {
                        cards.map((elem, index) => {
                            if(elem.colId === columnId) return (
                                <Card
                                    onDelete={() => deleteCard(elem.id)}
                                    key={elem.id}
                                    index={index}
                                    text={elem.body}
                                    cardId={elem.id}
                                    columnId={columnId}
                                />
                                )
                        })
                    }
                    {provided.placeholder}
                </ul>
            }
        </Droppable>
        )
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards
    }
};

const mapDispatchToProps = {
    DELETE_CARD
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);