import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

export const TodoType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  due: PropTypes.instanceOf(Date).isRequired, 
});

function now() {
  return new Date(Date.now());
}

function getDay(date: Date): String {
  return date.toDateString();
}

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
    const {name, due} = this.props.todo;
    var day;
    if (getDay(due) === getDay(now())) {
      day = (<span>
        <span 
          style={{float: "right", borderBottom: "1px solid green"}} 
          className="is-size-7"
          data-tip={moment(due).format("MMM D")}
        >Today</span>
        <ReactTooltip effect="solid"/>
      </span>);
    } else {
      day = [];
    }
    return (
      <div 
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}
        style={{display: "flex", cursor: "text"}}
      >
        <span className="my-todo-moving-grip" style={showOnHover}><i className="fas fa-grip-vertical"></i></span>
        <span className="my-todo" style={{display: "flex", justifyContent: "space-between"}}>
          <span style={{flex: "1", display: "flex"}}>
            <span className="my-todo-circle"><i className="far fa-circle"></i></span>
            <span className="my-todo-check-mark"><i className="fas fa-check"></i></span>
            <div className="my-todo-name">{name}</div>
            <span className="my-todo-comment" style={showOnHover}><i className="far fa-comment-alt"></i></span>
          </span>
          <span display={{flex: "1"}}>
            {day}
          </span>
        </span>
        <span className="my-todo-ellipsis" style={showOnHover}><i className="fas fa-ellipsis-h"></i></span>
      </div>
    );
  }
}

export default TodoItem;
