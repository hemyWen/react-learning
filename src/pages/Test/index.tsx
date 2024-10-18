import React, { useState, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";
const Test = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <button onClick={() => setValue(value + 1)}>+</button>
      {value}
      <Child name="child" />
    </>
  );
};

export default Test;
