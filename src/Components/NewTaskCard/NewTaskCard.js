import React, { useState } from "react";
import  submit  from "../../Assets/submit.svg";




import './NewTaskCard.css';


const NewTaskCard=(props)=>{

    const[newTaskContent, setNewTaskContent]=useState('');

    const newTaskContentChangeHandler=(event)=>{
        setNewTaskContent(event.target.value);
    }

    const addNewTask=()=>{
        props.triggerAddMode();
        props.addTask(newTaskContent);
    }

    const deleteTask=()=>{
        props.deleteTask(props.id);
    }
    return(
        <div className="newTaskCard">
           <div className="header">
                <div className="cancel">
                </div>
                <div className="header-desc">
                    <h4>Add new task</h4>
                </div>
                <div className="submit">
                    <img onClick={addNewTask} alt="" src={submit}></img>
                </div>
           </div>
           <div className="body">
                <textarea onChange={newTaskContentChangeHandler} placeholder="Enter task content ..."></textarea>
           </div>
        </div>
    )
}

export default NewTaskCard;