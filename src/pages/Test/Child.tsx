import React from "react";
import { ReactNode } from "react";
const Child = React.memo((props) => {
  console.log(props.name);
  return (
    <div>
      <h1>Child</h1>
      <p>{props.name}</p>
    </div>
  );
});
export default Child;
