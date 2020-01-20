// 本文件用于统一修改数据

export default function(reducer) {
  return function(state, action) {
    let newState = reducer(state, action);

    // todo

    return newState;
  };
}
