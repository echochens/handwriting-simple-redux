import React, { useState, useEffect } from "react";
import store from "../store";
import { Provider } from "../store/connect";
import Sub from "./sub";
import Mobx from "./mobx";

function App() {
  const [state, setState] = useState([]);
  const handleReduxClick = () => {
    store.dispatch({
      type: "decrement",
      playload: 2,
    });
  };
  useEffect(() => {
    store.subscribe(() => {
      setState([]);
    });
  }, []);

  return (
    <Provider value={store}>
      <div className="App">
        <div onClick={handleReduxClick}>{store.getState().count}</div>
        <Sub />
        <Mobx />
      </div>
    </Provider>
  );
}

export default App;
