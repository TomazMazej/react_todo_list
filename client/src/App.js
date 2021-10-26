import { useState, useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Lists from "./components/Lists";
import Tasks from "./components/Tasks";

const API_BASE = "http://localhost:3001";

function App() {
  // lists
  const [lists, setLists] = useState([]);
  const [addListActive, setAddListActive] = useState(false);
  const [newList, setNewList] = useState("");
  const [newTag, setNewTag] = useState("");
  const [listId, setListId] = useState("");

  // todos
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetLists();
  }, [])

  useEffect(() => {
    GetTodos();
  }, [])

  const handleStateChange = (id) => {
    setListId(id);
  }

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

  const deleteList = async id => {
    const data = await fetch(API_BASE + "/list/delete/" + id, {
      method : "DELETE"
    }).then(res => res.json());

      setLists(lists => lists.filter(list => list._id !== data._id));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method : "DELETE"
    }).then(res => res.json());

      setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

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

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new/", {
      method : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({text: newTodo})
    }).then(res => res.json());

    setTodos([...todos, data]);
    setPopupActive(false);
    setNewTodo("");
  }

  return (
    <Router>
      <div className="App">
        <h1>TODO List</h1>
        
        <Route path='/' exact render={(props) => (
          <>
            <Lists lists={lists} onDelete={deleteList} handleStateChange={handleStateChange}/>
            <div className="addPopup" onClick={() => setAddListActive(true)}>+</div>

            {addListActive ? (
              <div className="popup">
                <div className="closePopup" onClick={() => setAddListActive(false)}>x</div>
                <div className="content">
                  <h3>Add List</h3>
                  <input 
                    type="text" 
                    className="add-todo-input" 
                    onChange={e => setNewList(e.target.value)} 
                    value={newList} />
                  <input 
                    type="text" 
                    className="add-todo-input" 
                    onChange={e => setNewTag(e.target.value)} 
                    value={newTag} />
                  <div className="button" onClick={addList}>Create List</div>
                  </div>
              </div>
            ) : ''}
        </>
        )} />

        <Route path='/lists/:id' exact render={(props) => {
          return <Tasks todos={todos.filter(todo => todo.list.toString() === window.location.pathname.split('/')[2])} onDelete={deleteTodo} onComplete={completeTodo}/>
        }} />

        <Route path='/todos' exact render={(props) => {
          return (
            <>
              <Tasks todos={todos.filter(todo => todo.list === listId)} onDelete={deleteTodo} onComplete={completeTodo}/>
              <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
  
              {popupActive ? (
                <div className="popup">
                  <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
                  <div className="content">
                    <h3>Add Task</h3>
                    <input 
                      type="text" 
                      className="add-todo-input" 
                      onChange={e => setNewTodo(e.target.value)} 
                      value={newTodo} />
                      <div className="button" onClick={addTodo}>Create Task</div>
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
