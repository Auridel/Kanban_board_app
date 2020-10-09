import React from "react";
import {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import {ADD_CARD, ADD_COLUMN} from "../../actions";
import "./addForm.scss";
import cancelSvg from "../../assets/img/cancel.svg";
import WithService from "../hoc_withService/withService";
import randomIdGenerator from "../../common/randomIdGenerator";

const AddForm = ({newColumn, columnId, entries, ADD_CARD, ADD_COLUMN, service}) => {
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
            const newEntries = [...entries.map(elem => Object.assign({}, elem))];
            const idx = newEntries.findIndex(item => +item.id === +id);
            const card = {
                body: text,
                id: randomIdGenerator(`${text}`)
            };
            newEntries[idx].cards = [...entries[idx].cards, card];
            const updatedColumn = {
                title: entries[idx].title,
                cards: [...entries[idx].cards, card]
        };
            ADD_CARD(newEntries);
            closeForm();
            service.updateColumn(id, updatedColumn)
                .then(() => {
                    console.log("card added")
                })
                .catch(() => {
                    console.log("card add err")
                })
        }
    };
    const addNewColumn = (title) => {
        if(title) {
            service.addColumn({
                title: title,
                cards : []
            })
                .then((res) => {
                    ADD_COLUMN(title, res.id);
                    console.log("col added")
                })
                .catch(() => {
                    console.log("col add error");
                });
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

const mapStateToProps = (state) => {
    return {
        entries: state.entries
    }
};

const mapDispatchToProps = {
    ADD_CARD,
    ADD_COLUMN
};

export default WithService()(connect(mapStateToProps, mapDispatchToProps)(AddForm));