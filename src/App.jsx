import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { 
      id: Date.now(), 
      text: input, 
      done: false,
      createdAt: new Date().toLocaleDateString()
    }]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const completedCount = todos.filter(todo => todo.done).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="app">
      <div className="todo-container">
        <div className="header">
          <h1>✨ My To-Do List</h1>
          <p className="subtitle">Stay organized and productive!</p>
        </div>
        
        <div className="todo-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="todo-input-field"
          />
          <button onClick={addTodo} className="add-btn">
            <span>+</span>
          </button>
        </div>

        <div className="filter-tabs">
          <button 
            className={filter === "all" ? "active" : ""} 
            onClick={() => setFilter("all")}
          >
            All ({todos.length})
          </button>
          <button 
            className={filter === "active" ? "active" : ""} 
            onClick={() => setFilter("active")}
          >
            Active ({activeCount})
          </button>
          <button 
            className={filter === "completed" ? "active" : ""} 
            onClick={() => setFilter("completed")}
          >
            Completed ({completedCount})
          </button>
        </div>

        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            {filter === "all" ? "No tasks yet. Add one above!" : 
             filter === "active" ? "No active tasks!" : 
             "No completed tasks!"}
          </div>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
                <div className="todo-content">
                  <button 
                    className={`checkbox ${todo.done ? "checked" : ""}`}
                    onClick={() => toggleDone(todo.id)}
                  >
                    {todo.done && <span className="checkmark">✓</span>}
                  </button>
                  <div className="todo-text">
                    <span className="todo-title">{todo.text}</span>
                    <span className="todo-date">{todo.createdAt}</span>
                  </div>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="delete-btn"
                  title="Delete task"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        {todos.length > 0 && (
          <div className="stats">
            <span>{activeCount} task{activeCount !== 1 ? 's' : ''} remaining</span>
            {completedCount > 0 && (
              <button 
                onClick={() => setTodos(todos.filter(todo => !todo.done))}
                className="clear-completed"
              >
                Clear completed ({completedCount})
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
