import React from "react";
import {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import {ADD_CARD} from "../../actions";
import "./addForm.scss";
import cancelSvg from "../../assets/img/cancel.svg";

const AddForm = ({newColumn, columnId, ADD_CARD, entries}) => {
    const [openForm, setOpenForm] = useState(false);
    const inputRef = useRef(),
        blockRef = useRef();

    const handleClick = (e) => {
        const node = blockRef.current;
        if((!node || !node.contains(e.target))){
            setOpenForm(false);
        }
    };

    const addNewCard = (text, id) => {
        const card = {
            body: text,
            id: entries[id].cards.length + 1
        };
        ADD_CARD(card, id);
        inputRef.current.value = "";
        setOpenForm(false);
    };


    useEffect(() => {
        if(openForm) {
            inputRef.current.focus();
            document.addEventListener("click", handleClick);
        }
        return () => {
            document.removeEventListener("click", handleClick);
        }
    });

    const onOpen = () => {
        return (
            <div className="add__form-block">
                <textarea ref={inputRef}
                          placeholder={newColumn ? "Введите название колонки" : "Введите текст карточки"}
                          rows="3"
                          className="add__input"
                ></textarea>
                <button onClick={() => {
                    addNewCard(inputRef.current.value, columnId);
                }}
                        className="add__new-btn"
                >{newColumn ? "Добавить колонку" : "Добавить карточку"}</button>
                <button
                    onClick={() => setOpenForm(false)}
                    className="add__new-close"
                >
                    <img className="add__new-cancel-icon" src={cancelSvg}/>
                </button>
            </div>
        )
    };

    return(
        <div ref={blockRef} className={`${newColumn ? "add__column" : "add__block"}${openForm ? " add__opened" : ""}`}>
            {openForm ? onOpen() : <button onClick={() => setOpenForm(!openForm)} className="add__button">{newColumn ? "Добавить еще одну колонку" : "Добавить ещё одну карточку"}</button>}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        entries: state.entries
    }
};

const mapDispatchToProps = {
    ADD_CARD
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);