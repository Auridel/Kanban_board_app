import React from "react";
import {useState, useEffect, useRef} from "react";
import {connect} from "react-redux";
import "./addForm.scss";
import cancelSvg from "../../assets/img/cancel.svg";

const AddForm = ({purpose, columnId}) => {
    const [openForm, setOpenForm] = useState(false);
    const inputRef = useRef(),
        blockRef = useRef();

    const handleClick = (e) => {
        const node = blockRef.current;
        if((!node || !node.contains(e.target))){
            setOpenForm(false);
        }
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
                    rows="3"
                    className="add__input"
                ></textarea>
                <button className="add__new-btn">Добавить</button>
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
        <div ref={blockRef} className={`${purpose ? "add__column" : "add__block"}${openForm ? " add__opened" : ""}`}>
            {openForm ? onOpen() : <button onClick={() => setOpenForm(!openForm)} className="add__button">Добавить ещё одну карточку</button>}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        formOpened: state.formOpened
    }
};

export default connect(mapStateToProps)(AddForm);