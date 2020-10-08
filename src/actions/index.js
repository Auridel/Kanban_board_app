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
        payload: {
            title,
            id
        }
    }
};

const DELETE_COLUMN = (id) => {
    return {
        type: "DELETE_COLUMN",
        payload: id
    }
};

const DELETE_CARD = (columnId, cardId) => {
    return {
        type: "DELETE_CARD",
        payload: {
            columnId,
            cardId
        }
    }
};

const DRAG_CARDS = (newEntries) => {
    return {
        type: "DRAG_CARDS",
        payload: {
            newEntries
        }
    }
};


export {
    GET_ENTRIES,
    ADD_CARD,
    ADD_COLUMN,
    DELETE_COLUMN,
    DELETE_CARD,
    DRAG_CARDS
}