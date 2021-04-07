import { FULL_LEFT, COLLAPSE_LEFT } from "../actions/actionType";

const initialState = {
  fullLeftBar: 1,
};
export default function navbarReducer(state = initialState, action) {
  switch (action.type) {
    case FULL_LEFT:
      return {
        ...state,
        fullLeftBar: 1,
      };
      break;
    case COLLAPSE_LEFT:
      return {
        ...state,
        fullLeftBar: 0,
      };
      break;
    default:
      return state;
  }
}
