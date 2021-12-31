import React from "react";
import { observable, reaction } from "mobx";
import { observer } from "mobx-react";
const data = observable({ value: 0 });

const dispose = reaction(
  () => data.value,
  (cur, prev) => {
    console.log("cur, prev--->", cur, prev);
    if (cur > 5) {
      dispose();
      console.log("stop obervable data value");
    }
  },
  {
    fireImmediately: true,
  }
);

export default observer(function Mobx(params) {
  const handleChange = () => {
    data.value++;
  };

  return (
    <div>
      Mobx-Component
      <button onClick={handleChange}> change data {data.value}</button>
    </div>
  );
});
