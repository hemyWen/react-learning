import React, { useRef, useEffect, useLayoutEffect } from "react";
import "./style.css";
export default function Test() {
  let ball1 = useRef(null);
  let ball2 = useRef(null);

  useEffect(() => {
    if (ball1.current) {
      ball1.current.style.left = `200px`;
    }
  }, []);

  useLayoutEffect(() => {
    if (ball2.current) {
      ball2.current.style.left = `200px`;
    }
  }, []);

  return (
    <>
      <h1>useEffect</h1>
      <div className="ball1" ref={ball1}></div>
      <h1>useLayoutEffect</h1>
      <div className="ball2" ref={ball2}></div>
    </>
  );
}
