import React from "react";
import {useEffect} from "react";
import {connect} from "react-redux";
import {DragDropContext} from "react-beautiful-dnd";
import {GET_ENTRIES, DRAG_CARDS} from "../../actions";
import WithService from "../hoc_withService/withService";
import Column from "../column/column";
import AddForm from "../addForm/addForm";
import "./app.scss";



const App = ({service, loaded, entries, GET_ENTRIES, DRAG_CARDS}) => {

    useEffect(() => {
        if(!loaded) {
            service.getColumns()
                .then((res) => {
                    GET_ENTRIES(res);
                })
                .catch((err) => {
                    console.log("error " + err);
                });
        }
    }, [loaded]);

    const onDragEnd = (result) => {
        const {source, destination} = result;

        if(!destination) return;
        if((source.droppableId === destination.droppableId) &&
            source.index === destination.index) return;

        const newEntries = [...entries.map(elem => {
            return Object.assign({}, elem)
        })];
        const sourceIdx = entries.findIndex(item => +item.id === +source.droppableId);
        const destIdx = entries.findIndex(item => +item.id === +destination.droppableId);

        if(source.droppableId !== destination.droppableId){
            newEntries[sourceIdx].cards = [...entries[sourceIdx].cards];
            newEntries[destIdx].cards = [...entries[destIdx].cards];
            const removed = newEntries[sourceIdx].cards.splice(source.index, 1);
            newEntries[destIdx].cards.splice(destination.index, 0, removed[0]);

            DRAG_CARDS(newEntries);
            service.updateColumn(source.droppableId, newEntries[sourceIdx])
                .then(() => {
                    service.updateColumn(destination.droppableId, newEntries[destIdx])
                        .then(() => {
                            console.log("drag success")
                        })
                        .catch(() => {
                            console.log("drag err 2 lev")
                        })
                })
                .catch(() => {
                    console.log("drag err 1 lev")
                })
        }else {
            const removed = newEntries[sourceIdx].cards.splice(source.index, 1);
            newEntries[sourceIdx].cards.splice(destination.index, 0, removed[0]);

            DRAG_CARDS(newEntries);
            service.updateColumn(source.droppableId, newEntries[sourceIdx])
                .then(() => {
                    console.log("drag success")
                })
                .catch(() => {
                    console.log("drag err")
                })
        }
    };

    return(
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="main-screen">
              {
                  loaded ? entries.map((item) => {
                      const {title}=item;
                      return (
                          <Column key={item.id} title={title} id={item.id}/>
                      )
                  }) : ""
              }
              <AddForm columnId={null} newColumn={true}/>
          </div>
        </DragDropContext>
    )
};

const mapStateToProps = (state) => {
    return{
        loaded: state.loaded,
        entries: state.entries
    }
};
const mapDispatchToProps = {
    GET_ENTRIES,
    DRAG_CARDS
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(App));