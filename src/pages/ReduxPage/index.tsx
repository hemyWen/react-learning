import store from "@/store";
import { useState } from "react";
export default function ReduxPage() {
  const [count, setCount] = useState(store.getState().counter);

  store.subscribe(() => {
    setCount(store.getState().counter);
  });
  // 定义一个名为increment的函数
  const increment = () => {
    // 调用store的dispatch方法，传入一个type为"INCREMENT"的对象
    store.dispatch({ type: "INCREMENT" });
  };
  return (
    <>
      <div>{count}</div>
      <button onClick={increment}>+</button>
    </>
  );
}
