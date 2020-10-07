import React from "react";
import {connect} from "react-redux";
import Card from "../card/card";

const CardList = ({entries, columnId}) => {

    const writeMarkup = (items) => {
        return (
            items[columnId].cards.map(elem => {
                return <Card key={elem.id} text={elem.body} cardId={elem.id}/>
            })
        )
    };

    return(
        <div className="card-list">
            {
                writeMarkup(entries)
            }
        </div>
        )
};

const mapStateToProps = (state) => {
    return {
        entries: state.entries
    }
};

export default connect(mapStateToProps)(CardList);