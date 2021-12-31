import React from "react";
import store from "../store";
import { connect } from "../store/connect";
import { bindActionCreators } from "redux";

function Sub({ onAdd, onDecrement, state }) {
  console.log("args", state);
  return (
    <div>
      subcomponents
      <div
        onClick={() => {
          onAdd(2);
        }}
      >
        subcomponents:{store.getState().count}
      </div>
      <div
        onClick={() => {
          onDecrement(2);
        }}
      >
        remove
      </div>
    </div>
  );
}

const onAdd = function (playload) {
  return { type: "add", playload };
};
const onDecrement = function (playload) {
  return { type: "decrement", playload };
};

const mapStateToProps = (states) => ({
  count: states.count,
});
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ onAdd, onDecrement }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sub);
