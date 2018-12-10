import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem, { TodoType } from './TodoItem';
import AddTask from './AddTask';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

class Inbox extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(TodoType).isRequired,
  }

  render() {
    const now = moment();

    const view = "Inbox";
    const title = 
      <div className="title">
          <span className="is-size-4" style={{paddingTop: "6px"}}>{view}</span>
          <div className="title-right">
            <div className="title-right-item" 
              style={{fontSize: "14px", marginTop: ".4em"}} 
              data-tip="Project comments">
              <i className="far fa-comment-alt"></i>
               <ReactTooltip effect="solid"/>
            </div>
            <div className="title-right-item" style={{paddingLeft: "1em", marginTop: "-.1em"}}>
              <img src="/ellipsis.png" style={{width: "20px"}}/>
            </div>
          </div>
        </div>
    ;

    const list = 
      <ul style={{marginLeft: "-1.70em"}}>
        {this.props.todos.filter(todo => !todo.completed).map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
        </ul>
    ;

    const addTask = <div style={{paddingTop: "1em"}}> <AddTask now={now} /> </div>;


    return (
      <div className="inbox-container">
        {title}
        {list}
        {addTask}
      </div>
    );
  }
}

export default Inbox;
