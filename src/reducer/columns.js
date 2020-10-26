const initialState = [
    {
        "title": "todo",
        "id": "1",
    },
    {
        "title": "tomorrow",
        "id": "2"
    }
]

const columns = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_COLUMN": {
            const {title, id} = action.payload;
            return [...state, {
                title,
                id
            }]
        }
        case "DELETE_COLUMN": {
            return state.filter(item => item.id !== action.payload)
        }
        default:
            return state;
    }
}

export default columns;