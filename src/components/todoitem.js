import React from 'react';

import PropTypes from 'prop-types';

export default function TodoItem(props) {
  const { todo } = props;

  // style
  const getCheckStyle = () => {
    return {
      textDecoration: todo.completed
        ? 'line-through'
        : 'none'
    };
  };

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
    <tr>
      <td>
        <input
          type='checkbox'
          value={todo.completed}
          checked={todo.completed}
          onChange={() => handleCheckCompleted(todo.id)}
        />
        &nbsp;
        <span style={getCheckStyle()}>{todo.title}</span>
      </td>
      <td style={{ textAlign: 'center' }}>
        <button onClick={() => handleSelectedTodo(todo)}>
          Edit
        </button>{' '}
        <button onClick={() => handleDeleted(todo.id)}>
          x
        </button>
      </td>
    </tr>
  );
}

// ****** Props Validations ********
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completed: PropTypes.func,
  handleCheckCompleted: PropTypes.func.isRequired,
  handleDeleted: PropTypes.func.isRequired,
  handleSelectedTodo: PropTypes.func.isRequired
};
