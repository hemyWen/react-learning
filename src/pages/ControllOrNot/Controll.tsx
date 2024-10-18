import { Input } from "antd";
import { useState } from "react";
export default function Controll() {
  const [name, setName] = useState("");
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <>
      <div>name:{name}</div>
      <Input style={{ width: "200px" }} value={name} onChange={changeName} />
    </>
  );
}
