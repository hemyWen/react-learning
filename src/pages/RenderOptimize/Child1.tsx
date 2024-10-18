import React from "react";

const Child1 = React.memo((props: any) => {
  console.log(props.count);
  return <div>{props.count}</div>;
});
export default Child1;
