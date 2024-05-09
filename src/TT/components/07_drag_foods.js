import React, { useState } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import "./../css/drag_css.css";
import img1 from "./../images/볶음밥덮밥류.png";
import img2 from "./../images/밥류.png";
import img3 from "./../images/대체식품류.png";

const initialItems = [
  { id: "item-1", content: img1 },
  { id: "item-2", content: img2 },
  { id: "item-3", content: img3 },
];

const App = () => {
  const [firstDroppableItems, setFirstDroppableItems] = useState(initialItems);
  const [secondDroppableItems, setSecondDroppableItems] = useState([]);
  const [thirdDroppableItems, setThirdDroppableItems] = useState([]);
  const [fourthDroppableItems, setFourthDroppableItems] = useState([]);
  const [fifthDroppableItems, setFifthDroppableItems] = useState([]);
  const [sixthDroppableItems, setSixthDroppableItems] = useState([]);
  const [seventhDroppableItems, setSeventhDroppableItems] = useState([]);

  const onDragUpdate = (update) => {
    const { destination, source } = update;
    if (!destination) return;

    const movedWithinList = destination.droppableId === source.droppableId;

    if (movedWithinList) {
      // 아이템을 동일한 리스트 내에서 이동할 때 이펙트를 제거
      const droppedIndex = source.index;
      const newIndex = destination.index;

      // 현재 컨텍스트의 스크롤 위치를 가져옵니다.
      const currentScroll = window.scrollY;

      // 아이템을 이동시키기 전에 스크롤 위치를 설정합니다.
      window.scrollTo(0, currentScroll);

      // 드래그 앤 드롭 상태를 업데이트합니다.
      const draggable = document.getElementById(`item-${droppedIndex}`);
      if (draggable) {
        draggable.style.transition = "none";
        draggable.style.transform = `translate(0, ${
          newIndex > droppedIndex ? -50 : 50
        }px)`;
      }
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const draggableId =
      source.droppableId === "drop-1"
        ? firstDroppableItems[source.index]
        : source.droppableId === "drop-2"
        ? secondDroppableItems[source.index]
        : source.droppableId === "drop-3"
        ? thirdDroppableItems[source.index]
        : source.droppableId === "drop-4"
        ? fourthDroppableItems[source.index]
        : source.droppableId === "drop-5"
        ? fifthDroppableItems[source.index]
        : source.droppableId === "drop-6"
        ? sixthDroppableItems[source.index]
        : seventhDroppableItems[source.index];

    if (source.droppableId !== destination.droppableId) {
      let newFirstDroppableItems = [...firstDroppableItems];
      let newSecondDroppableItems = [...secondDroppableItems];
      let newThirdDroppableItems = [...thirdDroppableItems];
      let newFourthDroppableItems = [...fourthDroppableItems];
      let newFifthDroppableItems = [...fifthDroppableItems];
      let newSixthDroppableItems = [...sixthDroppableItems];
      let newSeventhDroppableItems = [...seventhDroppableItems];

      switch (destination.droppableId) {
        case "drop-1":
          newFirstDroppableItems.splice(destination.index, 0, draggableId);
          setFirstDroppableItems(newFirstDroppableItems);
          break;
        case "drop-2":
          newSecondDroppableItems.splice(destination.index, 0, draggableId);
          setSecondDroppableItems(newSecondDroppableItems);
          break;
        case "drop-3":
          newThirdDroppableItems.splice(destination.index, 0, draggableId);
          setThirdDroppableItems(newThirdDroppableItems);
          break;
        case "drop-4":
          newFourthDroppableItems.splice(destination.index, 0, draggableId);
          setFourthDroppableItems(newFourthDroppableItems);
          break;
        case "drop-5":
          newFifthDroppableItems.splice(destination.index, 0, draggableId);
          setFifthDroppableItems(newFifthDroppableItems);
          break;
        case "drop-6":
          newSixthDroppableItems.splice(destination.index, 0, draggableId);
          setSixthDroppableItems(newSixthDroppableItems);
          break;
        case "drop-7":
          newSeventhDroppableItems.splice(destination.index, 0, draggableId);
          setSeventhDroppableItems(newSeventhDroppableItems);
          break;
        default:
          break;
      }

      switch (source.droppableId) {
        case "drop-1":
          newFirstDroppableItems = [...firstDroppableItems];
          newFirstDroppableItems.splice(source.index, 1);
          setFirstDroppableItems(newFirstDroppableItems);
          break;
        case "drop-2":
          newSecondDroppableItems = [...secondDroppableItems];
          newSecondDroppableItems.splice(source.index, 1);
          setSecondDroppableItems(newSecondDroppableItems);
          break;
        case "drop-3":
          newThirdDroppableItems = [...thirdDroppableItems];
          newThirdDroppableItems.splice(source.index, 1);
          setThirdDroppableItems(newThirdDroppableItems);
          break;
        case "drop-4":
          newFourthDroppableItems = [...fourthDroppableItems];
          newFourthDroppableItems.splice(source.index, 1);
          setFourthDroppableItems(newFourthDroppableItems);
          break;
        case "drop-5":
          newFifthDroppableItems = [...fifthDroppableItems];
          newFifthDroppableItems.splice(source.index, 1);
          setFifthDroppableItems(newFifthDroppableItems);
          break;
        case "drop-6":
          newSixthDroppableItems = [...sixthDroppableItems];
          newSixthDroppableItems.splice(source.index, 1);
          setSixthDroppableItems(newSixthDroppableItems);
          break;
        case "drop-7":
          newSeventhDroppableItems = [...seventhDroppableItems];
          newSeventhDroppableItems.splice(source.index, 1);
          setSeventhDroppableItems(newSeventhDroppableItems);
          break;
        default:
          break;
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
      <p className="main_alert">
        밥류/식사대용식품류/덮밥류를 얼마나 자주 드시나요?
      </p>
      <div className="grid-container">
        <Droppable droppableId="drop-1">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="droppable-area drop-01"
            >
              {firstDroppableItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`draggable-item ${
                        snapshot.isDragging ? "dragging" : ""
                      }`}
                    >
                      <img
                        className="drag_img"
                        src={item.content}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        <div className="check_div">
          <Droppable droppableId="drop-2">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-02"
              >
                {secondDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <img
                          className="drag_img"
                          src={item.content}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="drop-3">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-03"
              >
                {thirdDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <img
                          className="drag_img"
                          src={item.content}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="drop-4">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-04"
              >
                {fourthDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <img
                          className="drag_img"
                          src={item.content}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="drop-5">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-05"
              >
                {fifthDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <img
                          className="drag_img"
                          src={item.content}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="drop-6">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-06"
              >
                {sixthDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <img
                          className="drag_img"
                          src={item.content}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="drop-7">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-07"
              >
                {seventhDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <img
                          className="drag_img"
                          src={item.content}
                          alt={`Image ${index + 1}`}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
