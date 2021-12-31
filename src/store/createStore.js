export const createStore = (reducer) => {
  let state,
    listeners = [];

  const getState = () => {
    return state;
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listerner) => {
    if (!listeners.includes(listerner)) {
      listeners.push(listerner);
    }
    return function () {
      listeners = listeners.filter((l) => l !== listerner);
    };
  };
  //執行業務中不存在的type，目的是初始化state
  dispatch({
    type: "@@react-redux-init@@",
  });

  return {
    getState,
    dispatch,
    subscribe,
  };
};
