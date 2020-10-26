import React from "react";
import {connect} from "react-redux";
import {DragDropContext} from "react-beautiful-dnd";
import {DRAG_CARDS, DELETE_COLUMN} from "../../actions";
import Column from "../column/column";
import AddForm from "../addForm/addForm";
import "./app.scss";



const App = React.memo( ({cards, columns, DRAG_CARDS, DELETE_COLUMN}) => {

    const onDragEnd = (result) => {
        const {source, destination} = result;
        if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) return;
        let newCards = [...cards];
        const removed = newCards.splice(source.index, 1)
        if(source.droppableId === destination.droppableId){
            newCards = [...newCards.slice(0, destination.index), removed[0], ...newCards.slice(destination.index)];
            DRAG_CARDS(newCards);
        }
        else {
            removed[0].colId = destination.droppableId;
            newCards = [...newCards.slice(0, destination.index), removed[0], ...newCards.slice(destination.index)];
            DRAG_CARDS(newCards);
        }
    };

    const deleteColumn = (id, title) => {
        if(window.confirm(`Вы действительно хотите удалить колонку ${title}?`)){
            DELETE_COLUMN(id);
        }
    };

    return(
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="main-screen">
              {
                  columns.map((item) => {
                      const {title}=item;
                      return (
                          <Column deleteColumn={deleteColumn} key={item.id} title={title} id={item.id}/>
                      )
                  })
              }
              <AddForm columnId={null} newColumn={true}/>
          </div>
        </DragDropContext>
    )
});

const mapStateToProps = (state) => {
    return{
        columns: state.columns,
        cards: state.cards
    }
};
const mapDispatchToProps = {
    DRAG_CARDS,
    DELETE_COLUMN
};

export default connect(mapStateToProps, mapDispatchToProps)(App);