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
            return {
                ...state,
                entries: [...action.payload]
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
            return {
                ...state,
                entries: [...action.payload]
            }
        }
        case "DELETE_CARD": {
            return {
                ...state,
                entries: [...action.payload.newEntries]
            }
        }
        case "DRAG_CARDS":{
            return {
                ...state,
                entries: [...action.payload.newEntries]
            }
        }
        default: return state;
    }
};

export default reducer;