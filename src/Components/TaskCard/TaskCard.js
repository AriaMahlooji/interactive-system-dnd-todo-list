import { React, useState } from "react";
import trash from "../../Assets/trash.svg";
import pencil from "../../Assets/pencil.svg";
import dropdown from "../../Assets/dropDown.svg";
import tick from "../../Assets/tick.svg";
import editTick from "../../Assets/submitEdit.svg";
import cancelEdit from "../../Assets/cancelEdit.svg";

import "./TaskCard.css";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = (props) => {
  const [isEditMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(props.content);
  console.log(props);
  const deleteTask = () => {
    props.deleteTask(props.id);
  };

  const changeProgress = (event, newProgress) => {
    event.stopPropagation();
    props.changeProgress({ id: props.id, progress: newProgress });
  };

  const editTask = () => {
    setEditMode(!isEditMode);
    props.editTask({ id: props.id, content: editedContent });
  };

  return (
    <Draggable
      key={props.draggableId}
      draggableId={props.draggableId}
      index={props.keyy}
      
    >
      {(provided, snapshot) => {
        return (
          <div
            className="taskCard"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              backgroundColor: snapshot.isDragging ? "rgb(10, 191, 236)" : "white",
              
            }}
          >
            <div className="header">
              {!isEditMode && <div className="header-desc">Task</div>}
              {isEditMode && <div className="header-desc">Edit your task</div>}
              <div className="header-actions">
                {!isEditMode && (
                  <img onClick={deleteTask} alt="" src={trash}></img>
                )}
                {!isEditMode && (
                  <img
                    alt=""
                    src={pencil}
                    onClick={() => setEditMode(!isEditMode)}
                  ></img>
                )}
                {isEditMode && (
                  <img
                    alt=""
                    src={cancelEdit}
                    onClick={() => setEditMode(!isEditMode)}
                  ></img>
                )}
                {isEditMode && (
                  <img alt="" src={editTick} onClick={editTask}></img>
                )}
              </div>
            </div>
            <div className="body">
              <div className="content"></div>
              {!isEditMode && <p>{props.content}</p>}
              {isEditMode && (
                <textarea style={{width:"100%"}}
                  onChange={(event) => setEditedContent(event?.target.value)}
                  className="footer"
                  defaultValue={props.content}
                ></textarea>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
