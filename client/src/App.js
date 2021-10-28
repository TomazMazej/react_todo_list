import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DatePicker from "react-datepicker";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";
import "react-datepicker/dist/react-datepicker.css";

const API_BASE = "http://localhost:3001";

function App() {
  // Seznami
  const [lists, setLists] = useState([]);
  const [addListActive, setAddListActive] = useState(false);
  const [editListActive, setEditListActive] = useState(false);
  const [newList, setNewList] = useState("");
  const [newTag, setNewTag] = useState("");
  const [editedList, setEditedList] = useState("");

  // Opravila
  const [todos, setTodos] = useState([]);
  const [addTaskActive, setAddTaskActive] = useState(false);
  const [editTaskActive, setEditTaskActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [newReminder, setNewReminder] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    GetLists();
  }, [])

  useEffect(() => {
    GetTodos();
  }, [])

  const GetLists = () => {
    fetch(API_BASE + "/lists")
      .then(res => res.json())
      .then(data => setLists(data))
      .then(err => console.error("Error: ", err));
  }

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .then(err => console.error("Error: ", err));
  }

  //SEZNAMI
  const addList = async () => {
    const data = await fetch(API_BASE + "/list/new/", {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text: newList, tag: newTag})
    }).then(res => res.json());

    setLists([...lists, data]);
    setAddListActive(false);
    setNewList("");
    setNewTag("");
  }

  const deleteList = async id => {
    const data = await fetch(API_BASE + "/list/delete/" + id, {
      method : "DELETE"
    }).then(res => res.json());

    setLists(lists => lists.filter(list => list._id !== data._id));
  }

  const editList = async id => {
    const data = await fetch(API_BASE + "/list/edit/" + id, {
      method : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text: newTodo, 
                            tag: newTag})
    }).then(res => res.json());

    setLists(lists => lists.map(list => {
      if (list._id === data._id) {
        list.text = newTodo;
        list.tag = newTag;
      }

      setEditListActive(false);
      setNewTodo("");
      setNewTag("");

      return list;
    }))
  }

  //OPRAVILA
  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new/", {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text: newTodo, 
                            tag: newTag, 
                            reminder: newReminder,
                            date: dueDate,
                            list: window.location.pathname.split('/')[2]})
    }).then(res => res.json());

    setTodos([...todos, data]);
    setAddTaskActive(false);
    setNewTodo("");
    setNewTag("");
    setNewReminder("");
    setDueDate("");
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method : "DELETE"
    }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
      .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
      }))
  }

  const editTodo = async id => {
    const data = await fetch(API_BASE + "/todo/edit/" + id, {
      method : "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text: newTodo, 
                            tag: newTag, 
                            reminder: newReminder,
                            date: dueDate})
    }).then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.text = newTodo;
        todo.tag = newTag;
        todo.reminder = newReminder;
        todo.date = dueDate;
      }

      setEditTaskActive(false);
      setNewTodo("");
      setNewTag("");
      setNewReminder("");
      setDueDate("");

      return todo;
    }))
  }

  return (
    <Router>
      <div className="App">
        <h1>TODO List</h1>
        
        {/*SEZNAMI*/}
        <Route path='/' exact render={(props) => (
          <>
            <Lists lists={lists}
                   onDelete={deleteList}
                   onEdit={setEditListActive}
                   editedList={setEditedList}
                   newTodo={setNewTodo}
                   newTag={setNewTag}/>
            <div className="addPopup" onClick={() => setAddListActive(true)}>+</div>

            {/*Dodajanje seznama*/}
            {addListActive ? (
              <div className="popup">
                <div className="closePopup" onClick={() => setAddListActive(false)}>x</div>
                <div className="content">
                  <h3>Add List</h3>
                  <input 
                    type="text" 
                    className="add-todo-input" 
                    onChange={e => setNewList(e.target.value)} 
                    value={newList} 
                    placeholder="Name"/>
                  <input 
                    type="text" 
                    className="add-todo-input" 
                    onChange={e => setNewTag(e.target.value)} 
                    value={newTag} 
                    placeholder="Tag"/>
                  <div className="button" onClick={addList}>Create List</div>
                  </div>
              </div>
            ) : ''}

            {/*Urejanje seznama*/}
            {editListActive ? (
                <div className="popup">
                  <div className="closePopup" onClick={() => setEditListActive(false)}>x</div>
                  <div className="content">
                    <h3>Edit List</h3>
                    <input 
                      type="text" 
                      className="add-todo-input" 
                      onChange={e => setNewTodo(e.target.value)} 
                      value={newTodo} 
                      placeholder="Name"/>
                    <input 
                        type="text" 
                        className="add-todo-input" 
                        onChange={e => setNewTag(e.target.value)} 
                        value={newTag}
                        placeholder="Tag" />
                    <div className="button" onClick={() => editList(editedList)}>Edit Task</div>
                  </div>
                </div>
              ) : ''}
        </>
        )} />

        {/*OPRAVILA*/}
        <Route path='/list/:id' exact render={(props) => {
          return (
            <>
              <Tasks todos={todos.filter(todo => todo.list.toString() === window.location.pathname.split('/')[2])}
                     onDelete={deleteTodo}
                     onComplete={completeTodo}
                     onEdit={setEditTaskActive}
                     editedTask={setEditedTask}
                     newTodo={setNewTodo}
                     newTag={setNewTag}
                     newReminder={setNewReminder} />
              <div className="addPopup" onClick={() => setAddTaskActive(true)}>+</div>
  
              {/*Dodajanje opravila*/}
              {addTaskActive ? (
                <div className="popup">
                  <div className="closePopup" onClick={() => setAddTaskActive(false)}>x</div>
                  <div className="content">
                    <h3>Add Task</h3>
                    <input 
                      type="text" 
                      className="add-todo-input" 
                      onChange={e => setNewTodo(e.target.value)} 
                      value={newTodo} 
                      placeholder="Name"/>
                    <input 
                        type="text" 
                        className="add-todo-input" 
                        onChange={e => setNewTag(e.target.value)} 
                        value={newTag}
                        placeholder="Tag" />
                    <input 
                        type="text" 
                        className="add-todo-input" 
                        onChange={e => setNewReminder(e.target.value)} 
                        value={newReminder}
                        placeholder="Reminder (How many days?)" />
                    <h5>Due date:</h5>
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} dateFormat="dd/MM/yyy"/>
                    <div className="button" onClick={addTodo}>Create Task</div>
                  </div>
                </div>
              ) : ''}

            {/*Urejanje opravila*/}
            {editTaskActive ? (
                <div className="popup">
                  <div className="closePopup" onClick={() => setEditTaskActive(false)}>x</div>
                  <div className="content">
                    <h3>Edit Task</h3>
                    <input 
                      type="text" 
                      className="add-todo-input" 
                      onChange={e => setNewTodo(e.target.value)} 
                      value={newTodo} 
                      placeholder="Name"/>
                    <input 
                        type="text" 
                        className="add-todo-input" 
                        onChange={e => setNewTag(e.target.value)} 
                        value={newTag}
                        placeholder="Tag" />
                    <input 
                        type="text" 
                        className="add-todo-input" 
                        onChange={e => setNewReminder(e.target.value)} 
                        value={newReminder}
                        placeholder="Reminder(How many days?)" />
                    <h5>Due date:</h5>
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} dateFormat="dd/MM/yyy"/>
                    <div className="button" onClick={() => editTodo(editedTask)}>Edit Task</div>
                  </div>
                </div>
              ) : ''}
           </>
          )
        }
        } />
      </div>
    </Router>
  );
}

export default App;
