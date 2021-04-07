import { combineReducers, createStore } from "redux";

import navbarReducer from "./reducers/navbarReducer";
import headerReduer from "./reducers/headerReduer";

let store = combineReducers({
  leftnav: navbarReducer,
  header: headerReduer,
});

export default createStore(store);
