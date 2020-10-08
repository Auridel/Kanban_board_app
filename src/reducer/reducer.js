const initialState = {
    entries: [],
    loaded: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ENTRIES":{
            return {
                ...state,
                loaded: true,
                entries: [...action.payload]
            }
        }
        case "ADD_CARD": {
            const newEntries = [...state.entries],
                {columnIdx} = action.payload,
                {card} = action.payload;

            newEntries[columnIdx].cards = [...state.entries[columnIdx].cards, card];
            return {
                ...state,
                entries: [...newEntries]
            }
        }
        case "ADD_COLUMN":{
            const {title, id} = action.payload;
            return {
                ...state,
                entries: [...state.entries, {
                    title,
                    id: id,
                    cards: []
                }]
            }
        }
        case "DELETE_COLUMN": {
            const id = action.payload,
                newEntries = [...state.entries];
            const idx = newEntries.findIndex(item => +item.id === +id);
            return {
                ...state,
                entries: [...newEntries.slice(0,idx),...newEntries.slice(idx + 1, newEntries.length)]
            }
        }
        case "DELETE_CARD": {
            const {columnId, cardId} = action.payload,
                newEntries = [...state.entries],
                idx = newEntries.findIndex(item => +item.id === +columnId),
                newCards = [...state.entries[idx].cards.filter(elem => +elem.id !== +cardId)];
            newEntries[idx].cards = [...newCards];

            return {
                ...state,
                entries: [...newEntries]
            }
        }
        default: return state;
    }
};

export default reducer;