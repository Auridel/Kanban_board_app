const ADD_CARD = (card) => {
    return {
        type: "ADD_CARD",
        payload: card
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

const DELETE_CARD = (id) => {
    return {
        type: "DELETE_CARD",
        payload: id
    }
};

const DRAG_CARDS = (cards) => {
    return {
        type: "DRAG_CARDS",
        payload: cards
    }
};


export {
    ADD_CARD,
    ADD_COLUMN,
    DELETE_COLUMN,
    DELETE_CARD,
    DRAG_CARDS
}