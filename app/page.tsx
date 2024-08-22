"use client";
import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [toDoList, setToDoList] = useState([
    {
      id: 21546,
      title: 'عنوان النص',
      description: 'وصف المهمة',
      compleat: false
    }
  ]);

  function handelAddToDo(todo) {
    setToDoList((toDoList) => [...toDoList, todo]);
  }

  return (
    <>
      <main className="bg-dark bg-gradient text-white">
        <div className="container">
          <h1 className="text-center py-3">أنجز يا شفت 💪</h1>
          <div className="todolist">
            <Todos toDos={toDoList} />
            <Form onAddTodo={handelAddToDo} />
            <Progress />
          </div>
        </div>
      </main >
    </>
  );
}
function Todos({toDos}) {
  return (
    <div className="row">
      <ol className="list-group list-group-numbered">
        {toDos.map((todo) => (
          <ToDo todo={todo} key={todo.id} />
        ))}
      </ol>
    </div>
  );
}

function ToDo({ todo }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 ms-auto" style={todo.compleat ? { textDecoration: "line-through", textDecorationColor: "red", textDecorationStyle: "wavy" } : {}}>
        <div className="fw-bold">{todo.title}</div>
        {todo.description}
      </div>
      <button className="badge btn bg-info rounded-pill mx-2">{todo.compleat ? '' : '✔️'}</button>
      <button className="badge btn bg-danger rounded-pill">X</button>
    </li>
  )
}

function Form({onAddTodo}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function FormSubmit(e) {
    e.preventDefault();

    const newTodo = { title, description, compleat: false, id: Date.now() };
    if (!title) return;
    console.log(newTodo);

    onAddTodo(newTodo);

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