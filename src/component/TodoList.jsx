import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        const data = await response.json();
        setTodos(data.todos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (newTodo) => {
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    const data = await response.json();
    setTodos((prev) => [...prev, data]);
  };

  const updateTodo = async (updatedTodo) => {
    await fetch(`https://dummyjson.com/todos/${updatedTodo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    setTodos((prev) =>
      prev.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = async (id) => {
    await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  if (loading) return <div >Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      <ol>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ol>
    </div>
  );
};

export default TodoList;