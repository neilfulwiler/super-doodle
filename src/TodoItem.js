import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const TodoType = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

class TodoItem extends Component {
  static propTypes = {
    todo: TodoType,
  }

  state = {
    hover: false,
  }

  toggleHover() {
    this.setState(state => ({
      hover: !state.hover,
    }));
  }

  render() {
    const {hover} = this.state;
    const showOnHover = hover ? {} : { visibility: "hidden" }
    return (
      <div 
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}
        style={{display: "flex"}}
      >
        <span className="my-todo-moving-grip" style={showOnHover}><i class="fas fa-grip-vertical"></i></span>
        <span className="my-todo">
          <span className="my-todo-circle"><i class="far fa-circle"></i></span>
          <span className="my-todo-check-mark"><i class="fas fa-check"></i></span>
          <div className="my-todo-name">{this.props.todo.name}</div>
          <span className="my-todo-comment" style={showOnHover}><i class="far fa-comment-alt"></i></span>
        </span>
        <span className="my-todo-ellipsis" style={showOnHover}><i class="fas fa-ellipsis-h"></i></span>
      </div>
    );
  }
}

export default TodoItem;
