import popupReducer from "./popupReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  popup: popupReducer,
});

export default allReducers;
