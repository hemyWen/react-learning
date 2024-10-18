import { Button } from "antd";
import { useRef, useState } from "react";

export default function NotControl() {
  const eleRef = useRef(null);
  const [submitContent, setSubmitContent] = useState("");

  const handleSubmit = () => {
    // 通过ref获取输入框的值
    const content = eleRef.current?.value;
    setSubmitContent(content);
  };

  return (
    <div className="App">
      <input ref={eleRef} />
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
      <div>{submitContent ?? ""}</div>
    </div>
  );
}
