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
            const {entries} = state;
            const newEntries = entries,
                {columnIdx} = action.payload,
                {card} = action.payload;
            

            newEntries[columnIdx].cards = [...entries[columnIdx].cards, card];
            return {
                ...state,
                entries: [...newEntries]
            }
        }
        default: return state;
    }
};

export default reducer;