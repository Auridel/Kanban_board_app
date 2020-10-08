const GET_ENTRIES = (entries) => {
    return {
        type: "GET_ENTRIES",
        payload: entries
    }
};

const ADD_CARD = (card, columnIdx) => {
    return {
        type: "ADD_CARD",
        payload: {
            card,
            columnIdx
        }
    }
};

const ADD_COLUMN = (title, id) => {
    return {
        type: "ADD_COLUMN",
        payload: {title, id}
    }
};

const DELETE_COLUMN = (id) => {
    return{
        type: "DELETE_COLUMN",
        payload: id
    }
};


export {
    GET_ENTRIES,
    ADD_CARD,
    ADD_COLUMN,
    DELETE_COLUMN
}