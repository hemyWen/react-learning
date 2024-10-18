import React from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

export default function RenderOptimize() {
  const [count, setCount] = React.useState(0);
  const [otherCount, setOtherCount] = React.useState(0);
  return (
    <>
      <h2>父组件渲染导致子组件渲染,如果子组件没有发生改变,就要避免无谓的渲染</h2>
      <ul>
        <li>shouldComponentUpdate</li>
        <li>PureComponent</li>
        <li>React.memo</li>
      </ul>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setOtherCount(otherCount + 1)}>+</button>
        <Child1 count={count} />
        <Child2 count={count} />
      </div>
    </>
  );
}
