import React, { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import add from "../../Assets/add.svg";
import cancel from "../../Assets/cancel.svg";
import { Droppable } from "react-beautiful-dnd";
import "./ProgressCard.css";
import NewTaskCard from "../NewTaskCard/NewTaskCard";

const ProgressCard = (props) => {
  let tasks = [];
  const [addMode, setAddMode] = useState(false);

  const triggerAddMode = () => {
    if (addMode === false) {
      setAddMode(true);
    }
    if (addMode === true) {
      setAddMode(false);
    }
  };
  for (let i = 0; i < props.tasks.length; i++) {
    tasks.push(
      <TaskCard
        draggableId={props.tasks[i].id}
        editTask={props.editTask}
        changeProgress={props.changeProgress}
        deleteTask={props.deleteTask}
        keyy={i}
        key={i}
        id={props.tasks[i].id}
        content={props.tasks[i].content}
        progress={props.tasks[i].progress}
      ></TaskCard>
    );
  }
  return (
    <div className="progressCard" >
      <div className="title">{props.title}</div>
      {props.addTaskAbility && (
        <div className="pFooter">
          {!addMode && <img onClick={triggerAddMode} alt="" src={add}></img>}
          {addMode && <img onClick={triggerAddMode} alt="" src={cancel}></img>}
        </div>
      )}
      <Droppable droppableId={props.droppableId} key={props.droppableId}>
        {(provided, snapshot) => {
          return (
            <div
              className="body"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.droppableProps.style,
                backgroundColor: snapshot.isDraggingOver ?"#04cfe65d":"#08d7eeda" ,
                
              }}
            >
              <div className="tasks">
                {props.addTaskAbility && addMode && (
                  <NewTaskCard
                    addTask={props.addTask}
                    triggerAddMode={triggerAddMode}
                  ></NewTaskCard>
                )}
                {tasks}
                {provided.placeholder}
              </div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default ProgressCard;
