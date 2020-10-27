import React from "react";
import {connect} from "react-redux";
import {DragDropContext} from "react-beautiful-dnd";
import {DRAG_CARDS, DELETE_COLUMN} from "../../actions";
import Column from "../column/column";
import AddForm from "../addForm/addForm";
import "./app.scss";



const App = ({cards, columns, DRAG_CARDS, DELETE_COLUMN}) => {

    const onDragEnd = (result) => {
        const {source, destination} = result;
        if (!destination) return;
        const removed = cards.splice(source.index, 1);
        if(source.droppableId === destination.droppableId){
            cards.splice(destination.index, 0, removed[0]);
            let res = [];
            columns.forEach(i => {
                res = [...res, ...cards.filter(e => i.id === e.colId)];
            })
            DRAG_CARDS(res);
        }
        else {
            removed[0].colId = destination.droppableId;
            if(source.index < destination.index) cards.splice(destination.index-1, 0, removed[0]);
            else cards.splice(destination.index, 0, removed[0]);
            let res = [];
            columns.forEach(i => {
                res = [...res, ...cards.filter(e => i.id === e.colId)];
            })
            DRAG_CARDS(res);
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
};

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