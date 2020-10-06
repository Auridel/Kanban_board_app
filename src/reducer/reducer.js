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
            const newState = state,
                index = newState.findIndex(item => item.index === action.payload.columnIdx);
            newState[index].cards = [...state[index].cards, action.payload.card];
            return {
                state: newState
            }
        }
        default: return state;
    }
};

export default reducer;