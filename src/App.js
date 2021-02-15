import React, { useState, useEffect } from 'react';

import Header from './components/header';
import TodoForm from './components/todoform';
import TodoList from './components/todolist';
import {
  getTodos,
  newTodo,
  updateTodo,
  deleteTodo
} from './services';

const state = {
  todos: [],
  selectedTodo: { id: 0, title: '', completed: false }
};

export default function App() {
  const [curState, setCurState] = useState(state);

  useEffect(() => {
    const getTodoList = () => {
      getTodos().then((resp) => {
        setCurState({
          todos: resp.data,
          selectedTodo: curState.selectedTodo
        });
      });
    };
    getTodoList();
  }, []);

  // handles
  const handleCompleted = (id) => {
    const td = curState.todos.find(
      (todo) => todo.id === id
    );
    updateTodo(td).then((resp) => {
      setCurState({
        todos: curState.todos.map((todo) => {
          if (todo.id === id) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
        selectedTodo: curState.selectedTodo
      });
    });
  };

  const handleDeleted = (id) => {
    deleteTodo(id).then((resp) => {
      if (resp.status === 200) {
        setCurState({
          todos: curState.todos.filter(
            (todo) => todo.id !== id
          ),
          selectedTodo: curState.selectedTodo
        });
      }
    });
  };

  const handleSelectedTodo = (todo) => {
    setCurState({
      todos: curState.todos,
      selectedTodo: todo
    });
  };

  const handleSubmitForm = (todo) => {
    if (todo.id === 0 || todo.id === undefined) {
      // insert
      todo.id = curState.todos.length + 1;
      newTodo(todo).then((resp) => {
        if (resp.data.id === 201) {
          setCurState({
            todos: [...curState.todos, todo],
            selectedTodo: {
              id: 0,
              title: '',
              completed: false
            }
          });
        }
      });
    } else {
      // update
      updateTodo(todo).then((resp) => {
        if (resp.data.id === todo.id) {
          setCurState({
            todos: curState.todos.map((item) => {
              if (item.id === todo.id) {
                return todo;
              } else {
                return item;
              }
            }),
            selectedTodo: curState.selectedTodo
          });
        }
      });
    }
  };

  return (
    <div className='container'>
      <Header />
      <TodoForm
        selectedTodo={curState.selectedTodo}
        handleSubmit={handleSubmitForm}
      />
      <TodoList
        todos={curState.todos}
        handleCheckCompleted={handleCompleted}
        handleDeleted={handleDeleted}
        handleSelectedTodo={handleSelectedTodo}
      />
    </div>
  );
}
