import { FULL_LEFT, COLLAPSE_LEFT } from "./actionType";
// action创建函数
export const fullLeftBar = () => {
  return {
    type: FULL_LEFT,
  };
};

export const collapseLeftBar = () => {
  return {
    type: COLLAPSE_LEFT,
  };
};
