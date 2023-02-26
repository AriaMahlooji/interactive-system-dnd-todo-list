import "./App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ProgressCard from "./Components/ProgressCard/ProgressCard";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const todoColumnId = uuidv4();
const inProgressColumnId = uuidv4();
const completedColumnId = uuidv4();

function App() {
  const [_tasks, setTasks] = useState([{}]);

  //axios.get('http://localhost:3333/tasks').then(res=> console.log(res.data));

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:3333/tasks");

      setTasks(result.data);
    };

    fetchData();
  }, []);

  const deleteTask = (id) => {
    axios
      .delete("http://localhost:3333/tasks/" + id)
      .then((response) => setTasks(response.data));
  };

  const addTask = (content) => {
    axios
      .post("http://localhost:3333/tasks/", { content: content })
      .then((response) => setTasks(response.data));
  };

  const changeProgress = (result) => {
    const{draggableId, source, destination}=result;
    let progress ='';
    
    
    if(!destination) return;
    if(source.droppableId === destination.droppableId) return;
    if(destination.droppableId === todoColumnId) progress='todo';
    if(destination.droppableId === inProgressColumnId) progress='inprogress';
    if(destination.droppableId === completedColumnId) progress='completed';

    axios
      .put("http://localhost:3333/tasks/" + draggableId, {
        progress: progress,
      })
      .then((response) => setTasks(response.data));
  };

  const editTask = (id_content) => {
    axios
      .put("http://localhost:3333/tasks/" + id_content.id, {
        content: id_content.content,
      })
      .then((response) => setTasks(response.data));
  };

  let todoTasks = _tasks.filter((task) => task.progress === "todo").reverse();
  let inProgressTasks = _tasks
    .filter((task) => task.progress === "inprogress")
    .reverse();
  let completedTasks = _tasks
    .filter((task) => task.progress === "completed")
    .reverse();
  return (
    <DragDropContext onDragEnd={result=> changeProgress(result)}>
      <div className="App">
        <div className="header">
          <h3>DnD todo-list app</h3>
        </div>
        <div className="body">
          <div className="progress_queues_container">
            <ProgressCard
              droppableId={todoColumnId}
              editTask={editTask}
              changeProgress={changeProgress}
              addTask={addTask}
              addTaskAbility={true}
              deleteTask={deleteTask}
              title="to do"
              tasks={todoTasks}
            />
            <ProgressCard
              droppableId={inProgressColumnId}
              editTask={editTask}
              changeProgress={changeProgress}
              deleteTask={deleteTask}
              title="in progress"
              tasks={inProgressTasks}
            />
            <ProgressCard
              droppableId={completedColumnId}
              editTask={editTask}
              changeProgress={changeProgress}
              deleteTask={deleteTask}
              title="completed"
              tasks={completedTasks}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
