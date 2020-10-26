import React from "react";
import {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import {ADD_CARD, ADD_COLUMN} from "../../actions";
import "./addForm.scss";
import cancelSvg from "../../assets/img/cancel.svg";
import { v4 as uuidv4 } from 'uuid';

const AddForm = ({newColumn, columnId, ADD_CARD, ADD_COLUMN}) => {
    const [openForm, setOpenForm] = useState(false);
    const [inputText, setInputText] = useState();
    const inputRef = useRef(),
        blockRef = useRef();

    useEffect(() => {
        if(openForm) {
            inputRef.current.focus();
            document.addEventListener("click", handleClick);
        }
        return () => {
            document.removeEventListener("click", handleClick);
        }
    },[openForm]);

    const closeForm = () => {
        setInputText("");
        setOpenForm(false);
    };
    const handleClick = (e) => {
        const node = blockRef.current;
        if((!node || !node.contains(e.target))){
            setOpenForm(false);
        }
    };
    const addNewCard = (text, id) => {
        if(text) {
            const card = {
                body: text,
                id: uuidv4(),
                colId: id
            };
            ADD_CARD(card);
            closeForm();
        }
    };
    const addNewColumn = (title) => {
        if(title) {
            ADD_COLUMN(title, uuidv4());
            closeForm();
        }
    };


    const onOpen = () => {
        return (
            <div className="add__form-block">
                <textarea ref={inputRef}
                          onInput={() => {
                              setInputText(inputRef.current.value);
                          }}
                          defaultValue={inputText ? inputText : ""}
                          placeholder={newColumn ? "Введите название колонки" : "Введите текст карточки"}
                          rows="3"
                          className="add__input"
                />
                <button onClick={() => {
                    newColumn ? addNewColumn(inputRef.current.value) : addNewCard(inputRef.current.value, columnId);
                }}
                        className="add__new-btn"
                >{newColumn ? "Добавить колонку" : "Добавить карточку"}</button>
                <button
                    onClick={() => setOpenForm(false)}
                    className="add__new-close"
                >
                    <img className="cancel-icon" src={cancelSvg} alt="cancel-icon"/>
                </button>
            </div>
        )
    };

    return(
        <div ref={blockRef} className={`${newColumn ? "add__column" : "add__block"}${openForm ? " add__opened" : ""}`}>
            {openForm ? onOpen() : <button onClick={() => setOpenForm(!openForm)} className="add__button">{newColumn ? "Добавить новую колонку" : "Добавить новую карточку"}</button>}
        </div>
    )
};


const mapDispatchToProps = {
    ADD_CARD,
    ADD_COLUMN
};

export default connect(null, mapDispatchToProps)(AddForm);