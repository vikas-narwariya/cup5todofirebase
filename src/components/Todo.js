import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { db } from "../firebase";

export default function Todo({ user }) {
  const [text, setText] = useState("");
  const [mytodos, setTodos] = useState([]);
  const history = useHistory();

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (user) {
      const docRef = db.collection("todos").doc(user.uid);
      docRef.onSnapshot((docSnap) => {
        if (docSnap.exists) {
          console.log(docSnap.data().todos);
          setTodos(docSnap.data().todos);
        } else {
          console.log("no docs");
        }
      });
    } else {
      history.push("/login");
    }
  }, []);

  const addTodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({
        todos: [...mytodos, text],
      });
  };

  const deleteTodo = (deleteTodo) => {
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap.data().todos.filter((todo) => todo != deleteTodo);
      docRef.update({
        todos: result,
      });
    });
  };

  const deleteAllTodo = (deleteAllTodo) => {
    const docRef = db.collection("todos").doc(user.uid);
    docRef.get().then((docSnap) => {
      const result = docSnap
        .data()
        .todos.filter((todo) => todo == deleteAllTodo);
      docRef.update({
        todos: result,
      });
    });
  };

  const updateTodo = (user) => {
    const updatedTodos = [...mytodos, text].map((todo) => {
      if (user.uid === user.uid) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  };

  const toggleComplete = (uid) => {
    let updatedTodos = [...mytodos, text].map((todo) => {
      if (user.uid === uid) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div
      className="container"
      style={{
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <h1>Todo</h1>

      <div className="input-field">
        <input
          type="text"
          placeholder="Add Todos"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <button className="add-btn" onClick={() => addTodo()}>
        Add Todo
      </button>
      <button className="del-btn" onClick={() => deleteAllTodo()}>
        Delete All Todo
      </button>

      <ul className="collection">
        {mytodos.map((todo) => {
          return (
            <>
              <li
                className="collection-item"
                key={todo}
                style={{ marginBottom: "0.5em", listStyle: "none" }}
              >
                <input
                  type="checkbox"
                  id="completed"
                  checked={mytodos.completed}
                  //onChange={() => toggleComplete(user.uid)}
                />

                {todo}

                <button
                  className="btn"
                  onClick={() => deleteTodo(todo)}
                  style={{ float: "right" }}
                >
                  delete
                </button>

                <button
                  className="update-btn"
                  //onClick={() => updateTodo(todo)}
                  style={{ float: "right", marginLeft: "10px" }}
                >
                  update
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
