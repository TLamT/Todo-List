import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggle = () => {
    setCompleted(!completed);
    updateTodo({ ...todo, completed: !completed });
  };
  const buttonStyle= {
    marginLeft: '10px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
   
  };

  return (
    <li>
      <input type="checkbox" checked={completed} onChange={handleToggle} />
      {todo.todo}
      <button onClick={() => deleteTodo(todo.id)} style={buttonStyle}>Delete</button>
    </li>
  );
};

export default TodoItem;