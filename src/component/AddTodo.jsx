import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ todo: value, completed: false });
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task"
        required
        style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', width: '200px'}}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;