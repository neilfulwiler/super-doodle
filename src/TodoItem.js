import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const TodoType = {
  name: PropTypes.string.isRequired,
};

class TodoItem extends Component {
  static propTypes = {
    todo: TodoType,
  }

  render() {
    return (
      <div>{this.props.todo.name}</div>
    );
  }
}

export default TodoItem;
