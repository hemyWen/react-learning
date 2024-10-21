import { useEffect, useRef } from "react";

export default function EventPage() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log("React componentDidMount！");
    parentRef.current?.addEventListener("click", () => {
      console.log("原生事件：父元素 DOM 事件监听！");
    });
    childRef.current?.addEventListener("click", () => {
      console.log("原生事件：子元素 DOM 事件监听！");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  }, []);
  const parentClickFunc = () => {
    console.log("React 事件：父元素事件监听！");
  };
  const childClickFunc = () => {
    console.log("React 事件：子元素事件监听！");
  };
  return (
    <>
      <ul>
        <li>React 所有事件都挂载在 document 对象上</li>
        <li>当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件</li>
        <li>所以会先执行原生事件，然后处理 React 事件</li>
        <li>最后真正执行 document 上挂载的事件</li>
      </ul>
      <div ref={parentRef} onClick={parentClickFunc}>
        <div ref={childRef} onClick={childClickFunc}>
          分析事件执行顺序(点击)
        </div>
      </div>
    </>
  );
}
