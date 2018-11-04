import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import TodoItem, { TodoType} from './TodoItem';

class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(TodoType),
  }

  render() {
    return (
      <ul>
      {this.props.todos.map(todo => (
        <li>
          <TodoItem todo={todo} />
        </li>
      ))}
      </ul>
    );
  }
}

export default TodoList;
