import React, { useState } from "react";
import "./../css/drag_foods_css.css";

const DragDropExample = () => {
  // 각 아이템에 대한 이미지 URL 설정
  const itemImages = {
    "Item 1": "src/TT/images/개구리.jpg",
    "Item 2": "./../images/개구리1.jpg",
    "Item 3": "./../images/개굴2.jpeg",
  };

  const [items, setItems] = useState(Object.keys(itemImages));
  const [dragging, setDragging] = useState(null);

  const handleDragStart = (e, item) => {
    setDragging(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropTarget) => {
    e.preventDefault();
    const draggedItemIndex = items.indexOf(dragging);
    const dropTargetIndex = items.indexOf(dropTarget);
    const newItems = [...items];
    newItems[draggedItemIndex] = dropTarget;
    newItems[dropTargetIndex] = dragging;
    setItems(newItems);
    setDragging(null);
  };

  return (
    <div className="container">
      <div className="food_container">
        {items.map((item, index) => (
          <div
            key={item}
            className={`item ${dragging === item ? "dragging" : ""}`}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, item)}
          >
            {/* 이미지로 아이템 대체 */}
            <img src={itemImages[item]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragDropExample;
