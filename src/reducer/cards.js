const initialState = [
    {
        "body": "Welcome to my app! Try to add some new cards, or remove existing",
        "id": 7,
        "colId": "1"
    },
    {
        "body": "You can also add some new columns, or delete theese",
        "id": 9,
        "colId": "2"
    },
    {
        "body": "You can also drag and drop cards between the columns",
        "id": 8,
        "colId": "1"
    }
];

const cards = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CARD": {
            return [...state, action.payload]
        }
        case "DELETE_COLUMN": {
            return state.filter(item => item.colId !== action.payload)
        }
        case "DELETE_CARD": {
            return state.filter(item => item.id !== action.payload)
        }
        case "DRAG_CARDS":{
            return [...action.payload]
        }
        default:
            return state;
    }
}

export default cards;