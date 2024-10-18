import Controll from "./Controll";
import NotControl from "./NotControll";

export default function ControllOrNot() {
  return (
    <>
      <h1>受控组件</h1>
      <ul>
        <li>受控组件通过props获取其当前值，并通过回调函数(比如onChange)通知变化</li>
        <li>表单状态发生变化时，都会通知React，将状态交给React进行处理，比如可以使用useState存储</li>
        <li>受控组件中，组件渲染出的状态与它的value或checked属性相对应</li>
        <li>受控组件会更新state的流程</li>
      </ul>
      <Controll />
      <h1>非受控组件</h1>
      <h3>非受控组件将数据存储在DOM中，而不是组件内，这比较类似于传统的HTML表单元素。</h3>
      <ul>
        <li>非受控组件的值不受组件自身的state和props控制</li>
        <li>非受控组件使用ref从DOM中获取元素数据</li>
      </ul>
      <NotControl />
    </>
  );
}
