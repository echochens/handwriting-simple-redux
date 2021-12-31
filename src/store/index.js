// import thunk from "redux-thunk";
// import { createStore, applyMiddleware } from "redux";
import { createStore } from "./createStore";

const initialStates = {
  count: 111,
};

const reducer = function (state = initialStates, action, ...agrs) {
  console.log("state", state, action, agrs);
  switch (action.type) {
    case "add":
      return {
        count: state.count + (action.playload ? action.playload : 2),
      };

    default:
      return {
        count: state.count - (action.playload ? action.playload : 2),
      };
  }
};

const store = createStore(reducer);

export default store;
