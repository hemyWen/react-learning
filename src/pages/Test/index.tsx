import React, { useEffect, useState } from "react";
import { DndContext, DragOverlay, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const Button = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <button ref={setNodeRef} style={style} {...attributes} {...listeners}>
      Button {id}
    </button>
  );
};

const DropArea = () => {
  const { attributes, listeners, setNodeRef } = useDroppable({
    id: "drop-area",
  });

  return (
    <div
      ref={setNodeRef}
      style={{ width: "100%", height: "300px", border: "1px solid black" }}
      {...attributes}
      {...listeners}
    >
      Drop Area
    </div>
  );
};

const Test = () => {
  const [buttonPositions, setButtonPositions] = useState({});

  useEffect(() => {
    // 从本地存储加载位置
    const savedPositions = localStorage.getItem("buttonPositions");
    if (savedPositions) {
      setButtonPositions(JSON.parse(savedPositions));
    }
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id === "drop-area") {
      const { id, transform } = active;
      const newPositions = {
        ...buttonPositions,
        [id]: transform,
      };
      setButtonPositions(newPositions);
      // 保存位置到本地存储
      localStorage.setItem("buttonPositions", JSON.stringify(newPositions));
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DropArea />
      {[1, 2, 3].map((id) => (
        <Button key={id} id={id} initialTransform={buttonPositions[id]} />
      ))}
      <DragOverlay />
    </DndContext>
  );
};

export default Test;
