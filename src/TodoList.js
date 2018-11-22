import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem, { TodoType } from './TodoItem';

class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(TodoType).isRequired,
  }

  render() {
    return (
      <div>
        <ul>
        {this.props.todos.map((todo, index) => (
          <li key={index}>
            <TodoItem todo={todo} />
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
