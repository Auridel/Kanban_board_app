import React from "react";
import {connect} from "react-redux";
import {DELETE_CARD} from "../../actions";
import Card from "../card/card";
import "./cardList.scss";
import {Droppable} from "react-beautiful-dnd";
import WithService from "../hoc_withService/withService";

const CardList = ({entries, columnId, DELETE_CARD, service}) => {

    const deleteCard = (colId, cardId) =>{
        const newEntries = [...entries.map(elem => Object.assign({}, elem))];
        const idx = newEntries.findIndex(item => +item.id === +colId);
        const newCards = newEntries[idx].cards.filter(item => {
            return +item.id !== +cardId
        });
        newEntries[idx].cards = [...newCards];

        DELETE_CARD(newEntries);
        service.updateColumn(colId, newEntries[idx])
            .then(() => {
                console.log("card deleted");
            })
            .catch(() => {
                console.log("card delete error");
            })
    };

    const writeMarkup = (items, colId) => {
        const idx = entries.findIndex(item => +item.id === +colId);
        return (
            items[idx].cards.map((elem, index) => {
                return (
                    <Card
                        onDelete={deleteCard}
                        key={elem.id}
                        index={index}
                        text={elem.body}
                        cardId={elem.id}
                        columnId={colId}
                    />
                )})
        )
    };

    return(
        <Droppable droppableId={`${columnId}`}>
            {(provided) =>
                <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}

                    className="card-list">
                    {
                        writeMarkup(entries, columnId)
                    }
                    {provided.placeholder}
                </ul>
            }
        </Droppable>
        )
};

const mapStateToProps = (state) => {
    return {
        entries: state.entries
    }
};

const mapDispatchToProps = {
    DELETE_CARD
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(CardList));