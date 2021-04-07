import {
  WECHAT_CODE_SHOW,
  WECHAT_CODE_HIDE
} from './actionType';

// action创建函数
export const wechatCodeShow = () => {
  return {
    type: WECHAT_CODE_SHOW
  }
}

export const wechatCodeHide = () => {
  return {
    type: WECHAT_CODE_HIDE
  }
}
