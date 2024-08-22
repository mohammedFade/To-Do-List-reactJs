"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  // const of todos list to 
  const [toDoList, setToDoList] = useState([
    {
      id: 21546,
      title: 'عنوان النص',
      description: 'وصف المهمة',
      compleat: false
    },
    {
      id: 215346,
      title: 'عنوان النص',
      description: 'وصف المهمة',
      compleat: true
    }
  ]);

  // function to add new todo
  function handelAddToDo(todo) {
    setToDoList((toDoList) => [...toDoList, todo]);
  }

  // function to delet todo
  function deleteToDo(id) {
    setToDoList((toDoList) => toDoList.filter((todo) => todo.id !== id));
  }

  // function to update compeleted to do
  function doneToDo(id) {
    setToDoList((toDoLists) =>
      toDoLists.map((toDoList) =>
        toDoList.id === id ? { ...toDoList, compleat: !toDoList.compleat } : toDoList
      )
    );
  }

  return (
    <>
      <main className="bg-dark bg-gradient text-white">
        <div className="container">
          <h1 className="text-center py-3">أنجز يا شفت 💪</h1>
          <div className="todolist">
            <Todos toDos={toDoList} onDeletTodo={deleteToDo} doneToDo={doneToDo} />
            <Form onAddTodo={handelAddToDo} />
            <Progress />
          </div>
        </div>
      </main >
    </>
  );
}

// output todos main design
function Todos({ toDos, onDeletTodo, doneToDo }) {
  return (
    <div className="row">
      <ol className="list-group list-group-numbered">
        {toDos.map((todo) => (
          <ToDo todo={todo} key={todo.id} onDeletTodo={onDeletTodo} doneToDo={doneToDo}/>
        ))}
      </ol>
    </div>
  );
}

// inechlize one todo templeate
function ToDo({ todo, onDeletTodo, doneToDo }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 ms-auto" style={todo.compleat ? { textDecoration: "line-through", textDecorationColor: "red", textDecorationStyle: "wavy" } : {}}>
        <div className="fw-bold">{todo.title}</div>
        {todo.description}
      </div>
      <button className="btn bg-info rounded-pill mx-2" onClick={() => doneToDo(todo.id)}>{todo.compleat ? '🎉' : '💪'}</button>
      <button className="btn bg-danger rounded-pill" onClick={() => onDeletTodo(todo.id)}>🗑️</button>
    </li>
  )
}

// function to handel form
function Form({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // stop default behaviuor
  function FormSubmit(e) {
    e.preventDefault();

    // resive data
    const newTodo = { title, description, compleat: false, id: Date.now() };
    // stop send when tite is empty
    if (!title) return;

    // call function to add todo
    onAddTodo(newTodo);

    // reset all data
    setTitle("");
    setDescription("");
  }
  return (
    <div className="row mt-4">
      <h3 className="text-center my-2">اضافة مهمة جديدة</h3>
      <form onSubmit={FormSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="عنوان المهمة"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea className="form-control" placeholder="وصف المهمة..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary mb-3">اضافة</button>
        </div>
      </form>
    </div>
  );
}

function Progress() {
  return (
    <div className="row">
      <div className="progress">
      </div>
    </div>
  );
}