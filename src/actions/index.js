const GET_ENTRIES = (entries) => {
    return {
        type: "GET_ENTRIES",
        payload: entries
    }
};

const ADD_CARD = (newEntries) => {
    return {
        type: "ADD_CARD",
        payload: newEntries
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

const DELETE_COLUMN = (newEntries) => {
    return {
        type: "DELETE_COLUMN",
        payload: newEntries
    }
};

const DELETE_CARD = (newEntries) => {
    return {
        type: "DELETE_CARD",
        payload: {
            newEntries
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