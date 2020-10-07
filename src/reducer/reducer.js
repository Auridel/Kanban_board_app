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
            const title = action.payload;
            return {
                ...state,
                entries: [...state.entries, {
                    title,
                    id: state.entries.length +1,
                    cards: []
                }]
            }
        }
        case "DELETE_COLUMN": {
            const id = action.payload,
                newEntries = [...state.entries];
            return {
                ...state,
                entries: [...newEntries.slice(0,id),...newEntries.slice(id + 1, newEntries.length)]
            }
        }
        default: return state;
    }
};

export default reducer;