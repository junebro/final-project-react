import React, { useState } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import "./../css/drag_css.css";
import img1 from "./../images/가당음료.png";
import img2 from "./../images/과자류.png";
import img3 from "./../images/사탕.png";
import { Link } from "react-router-dom";
import { NutriContext } from "../Nutri_Context";
import { useContext } from "react";
import { useAuth } from "./../../common/contexts/AuthContext";

const initialItems = [
  { id: "item-1", content: img1 },
  { id: "item-2", content: img2 },
  { id: "item-3", content: img3 },
];

const App = () => {
  const { drag6Items, setDrag6Items, setUserName } = useContext(NutriContext);

  const [firstDroppableItems, setFirstDroppableItems] = useState(initialItems);
  const [secondDroppableItems, setSecondDroppableItems] = useState([]);
  const [thirdDroppableItems, setThirdDroppableItems] = useState([]);
  const [fourthDroppableItems, setFourthDroppableItems] = useState([]);
  const [fifthDroppableItems, setFifthDroppableItems] = useState([]);
  const [sixthDroppableItems, setSixthDroppableItems] = useState([]);
  const [seventhDroppableItems, setSeventhDroppableItems] = useState([]);

  const updateDroppableItems = (droppableId, items) => {
    switch (droppableId) {
      case "drop-1":
        setFirstDroppableItems(items);
        break;
      case "drop-2":
        setSecondDroppableItems(items);
        break;
      case "drop-3":
        setThirdDroppableItems(items);
        break;
      case "drop-4":
        setFourthDroppableItems(items);
        break;
      case "drop-5":
        setFifthDroppableItems(items);
        break;
      case "drop-6":
        setSixthDroppableItems(items);
        break;
      case "drop-7":
        setSeventhDroppableItems(items);
        break;
      default:
        break;
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;

    const sourceItems = getDroppableItems(sourceDroppableId);
    const destinationItems = getDroppableItems(destinationDroppableId);

    const [movedItem] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, movedItem);

    updateDroppableItems(sourceDroppableId, sourceItems);
    updateDroppableItems(destinationDroppableId, destinationItems);

    setDrag6Items({
      drop1: firstDroppableItems,
      drop2: secondDroppableItems,
      drop3: thirdDroppableItems,
      drop4: fourthDroppableItems,
      drop5: fifthDroppableItems,
      drop6: sixthDroppableItems,
      drop7: seventhDroppableItems,
    });

    console.log(drag6Items);
  };

  const getDroppableItems = (droppableId) => {
    switch (droppableId) {
      case "drop-1":
        return firstDroppableItems;
      case "drop-2":
        return secondDroppableItems;
      case "drop-3":
        return thirdDroppableItems;
      case "drop-4":
        return fourthDroppableItems;
      case "drop-5":
        return fifthDroppableItems;
      case "drop-6":
        return sixthDroppableItems;
      case "drop-7":
        return seventhDroppableItems;
      default:
        return [];
    }
  };

  const validButton = firstDroppableItems.length > 0;

  const [userName, setUserNameInput] = useState(""); // 입력 필드의 상태를 관리하는 상태 변수

  const { user } = useAuth(); // useAuth 훅에서 user ID 가져오기

  const [error, setError] = useState(null); // 에러상태

  const callUserName = () => {
    console.log(user);
    if (user != null) {
      // 유저 이름 받아오기
      fetch("/nutri/sendUserId01", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: user,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          setUserName(data.memberNick); // 응답 데이터를 상태에 저장
          console.log("닉네임 : " + data.memberNick);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error); // 에러를 상태에 저장
        });
    } else {
      setUserName("게스트");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <p className="main_alert">
        밥류/식사대용식품류/덮밥류를 얼마나 자주 드시나요?
      </p>
      <div className="grid-container">
        <Droppable droppableId="drop-1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="droppable-area drop-01"
            >
              {firstDroppableItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`draggable-item`}
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
        <div className="check_div">
          <Droppable droppableId="drop-2">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-02"
              >
                {secondDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item`}
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
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-03"
              >
                {thirdDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item`}
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
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-04"
              >
                {fourthDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item`}
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
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-05"
              >
                {fifthDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item`}
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
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-06"
              >
                {sixthDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item`}
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
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="droppable-area drop-07"
              >
                {seventhDroppableItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-item`}
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
      {/* 컨텍스트 저장 / 다음 링크로 넘어가는 버튼 */}
      <div>
        {!validButton ? (
          <div>
            <Link
              to="http://localhost:3000/nutri/nutri/content14"
              className="next_button"
              onClick={callUserName}
            >
              <span>다음</span>
            </Link>
          </div>
        ) : (
          <button className="button_none">
            <span>항목을 입력해주세요</span>
          </button>
        )}
      </div>
    </DragDropContext>
  );
};

export default App;
