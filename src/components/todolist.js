import React from 'react';

import PropTypes from 'prop-types';

import TodoItem from './todoitem';

export default function TodoList(props) {
  const { todos } = props;

  // handles
  const handleCheckCompleted = (id) => {
    props.handleCheckCompleted(id);
  };

  const handleDeleted = (id) => {
    props.handleDeleted(id);
  };

  const handleSelectedTodo = (todo) => {
    props.handleSelectedTodo(todo);
  };

  return (
    <table border='0' width='100%' cellSpacing='3px'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            handleCheckCompleted={handleCheckCompleted}
            handleDeleted={handleDeleted}
            handleSelectedTodo={handleSelectedTodo}
          />
        ))}
      </tbody>
    </table>
  );
}

// ****** Props Validations ********
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completed: PropTypes.func,
  handleCheckCompleted: PropTypes.func.isRequired,
  handleDeleted: PropTypes.func.isRequired,
  handleSelectedTodo: PropTypes.func.isRequired
};
