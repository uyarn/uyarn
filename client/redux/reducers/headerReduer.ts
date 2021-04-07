import {
  WECHAT_CODE_SHOW,
  WECHAT_CODE_HIDE
} from '../actions/actionType';

const initialState = {
  wechat: false
}

export default function headerReducer(state = initialState, action) {
  switch (action.type) {
    case WECHAT_CODE_SHOW:
      return {
        ...state,
        wechat: true
      }
      break;
    case WECHAT_CODE_HIDE:
      return {
        ...state,
        wechat: false
      }
      break;
    default:
      return state
  }
}
