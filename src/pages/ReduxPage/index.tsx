import store from "@/store";
import { useState } from "react";
export default function ReduxPage() {
  const [count, setCount] = useState(store.getState().counter);

  store.subscribe(() => {
    setCount(store.getState().counter);
  });
  const increment = () => {
    store.dispatch({ type: "INCREMENT" });
  };
  return (
    <>
      <div>{count}</div>
      <button onClick={increment}>+</button>
    </>
  );
}
