import {combineReducers} from "redux";
import cards from "./cards";
import columns from "./columns";

const reducer = combineReducers({
    cards,
    columns
})

export default reducer;