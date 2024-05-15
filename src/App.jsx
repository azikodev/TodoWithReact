import { useRef } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  changeStateTodo,
} from "./features/counter/counterSlice";

function App() {
  const Notify = () => {
    toast("Inputlarni to'liq to'ldiring boyaka!"),
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      };
  };

  const dispatch = useDispatch();
  const { todos = [] } = useSelector((state) => state.todosState);

  const inputRef = useRef();
  const dateRef = useRef();
  const definitionRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputText = inputRef.current.value.trim();
    const dateText = dateRef.current.value.trim();
    const definitionText = definitionRef.current.value.trim();

    if (inputText && dateText && definitionText) {
      const newTodo = {
        id: Math.random(),
        text: inputText,
        date: dateText,
        definition: definitionText,
        completed: false,
      };
      dispatch(addTodo(newTodo));
      inputRef.current.value = "";
      dateRef.current.value = "";
      definitionRef.current.value = "";
    } else {
      Notify();
    }
  };

  console.log(todos);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Goal Name:</span>
          <input type="text" ref={inputRef} />
        </label>
        <label>
          <span>Definition:</span>
          <input type="text" ref={definitionRef} />
        </label>
        <label>
          <span>Date:</span>
          <input type="date" ref={dateRef} />
        </label>
        <button className="button">Submit</button>
      </form>
      <ul className="cards">
        {todos.map((item) => (
          <li
            key={item.id}
            style={{ opacity: item.completed ? "0.5" : "1" }}
            className="cardTodo"
          >
            <span>
              Goal Name:
              <p>{item.text}</p>
            </span>
            <span>
              Goal's definition:
              <p>{item.definition}</p>
            </span>
            <span>
              Goal's date:
              <p style={{ color: "red", fontWeight: "800" }}>{item.date}</p>
            </span>
            <div className="btnsContainer">
              <button
                onClick={() => dispatch(removeTodo(item.id))}
                className=" button focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                type="button"
              >
                Delete
              </button>
              <button
                onClick={() => dispatch(changeStateTodo(item.id))}
                className="button"
              >
                Done
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
}

export default App;
