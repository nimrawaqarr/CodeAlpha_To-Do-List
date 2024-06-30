import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./Todo.css";

export default function Todo() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Low");
  const [todo, setTodo] = useState([]);
  const [getTodoValue, setGetTodoValue] = useState([]);
  const [update, setUpdate] = useState(false);
  const [findUpdatedIndex, setFindUpdatedIndex] = useState("");

  const saveTodo = (event) => {
    event.preventDefault();
    if (!input) {
      alert("Enter Todo First");
    } else {
      const todoDetails = {
        id: Date.now(),
        todoName: input,
        priority: priority,
      };
      setTodo(
        (prevValue) => [...prevValue, todoDetails],
        localStorage.setItem("Todo", JSON.stringify([...todo, todoDetails]))
      );
      setInput("");
    }
  };

  useEffect(() => {
    setGetTodoValue(JSON.parse(localStorage.getItem("Todo")));
  }, [todo]);

  //Delete Todo
  const deleteTodo = (item) => {
    const deleteTodo = [...todo];
    const findDeletedIndex = deleteTodo.findIndex(
      (value) => value.id === item.id
    );
    deleteTodo.splice(findDeletedIndex, 1);
    localStorage.setItem("Todo", JSON.stringify(deleteTodo));
    setTodo(deleteTodo);
  };

  //Update Todo
  const updateTodo = (item) => {
    setUpdate(true);
    let todoArray = [...todo];
    setInput(item.todoName);
    setPriority(item.priority);
    setFindUpdatedIndex(todoArray.findIndex((value) => value.id === item.id));
  };

  const saveUpdatedTodo = (event) => {
    event.preventDefault();
    todo[findUpdatedIndex] = {
      id: Date.now(),
      todoName: input,
      priority: priority,
    };
    setTodo([...todo]);
    localStorage.setItem("Todo", JSON.stringify(todo));
    setUpdate(false);
    setInput("");
  };

  const filterLow = () => {
    const todoLow = todo.filter((todos) => {
      return todos.priority === "Low";
    });
    setGetTodoValue(todoLow);
  };

  const filterMedium = () => {
    const todoMedium = todo.filter((todos) => {
      return todos.priority === "Medium";
    });
    setGetTodoValue(todoMedium);
  };

  const filterHigh = () => {
    const todoHigh = todo.filter((todos) => {
      return todos.priority === "High";
    });
    setGetTodoValue(todoHigh);
  };

  const filterAll = () => {
    setGetTodoValue(todo);
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <h1 className="title">Todo App</h1>
          <br></br>
          <form>
            <label htmlFor="todo-text">Enter the Name of Todo</label>
            <input
              value={input}
              type="text"
              className="todo-text"
              id="todo-text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />{" "}
            {/* <br /> */}
            <label htmlFor="priority">Select Todo Priority</label>
            <select
              name=""
              id="priority"
              className="priority"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>{" "}
            <br />
            {!update ? (
              <button className="submit-todo" onClick={saveTodo}>
                Save Todo
              </button>
            ) : (
              <button onClick={saveUpdatedTodo} className="update-todo"> Update</button>
            )}
          </form>

          <div className="filter">
          <br></br>
          <br></br>
            <h2 className="title">Filter Result</h2>
            <br></br>
            <div className="filter-buttons">
            <button className="filter-btn by-all" onClick={filterAll}>
              All
            </button>
            <button className="filter-btn by-low" onClick={filterLow}>
              Low
            </button>
            <button className="filter-btn by-medium" onClick={filterMedium}>
              Medium
            </button>
            <button className="filter-btn by-high" onClick={filterHigh}>
              High
            </button>
            </div>
          </div>

          <div className="todo-entries">
            {getTodoValue ? (
              getTodoValue.map((item) => {
                return (
                  <>
                    <div
                      className="todo-entry"
                    >
                      <p className="name">{item.todoName}</p>
                      <div className="priority-btns">
                      <p className="priority">Priority: {item.priority}</p>
                    <div className="update-delete"> 
                      <EditIcon className="edit"
                        onClick={() => {
                          updateTodo(item);
                        }}

                      />{" "}
                      <DeleteIcon className="delete"
                        onClick={() => {
                          deleteTodo(item);
                        }}
                      />
                      </div> 
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <h1>No Todo Added</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
