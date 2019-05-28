import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { updateTodo, completeTodo } from './actions';
import TaskInput from './TaskInput';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export const TodoType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  due: PropTypes.instanceOf(Date).isRequired, 
  completed: PropTypes.bool.isRequired,
});

function now() {
  return new Date(Date.now());
}

function getDay(date: Date): String {
  return date.toDateString();
}

class TodoDatePicker extends Component {
  state = {
    startDate: new Date()
  }
 
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    const {startDate} = this.state;
    return (
      <div style={{width: "200px", height: "200px", position: "absolute"}}>
        <DatePicker 
          selected={startDate}
          onChange={date => this.setState({startDate: date})}
          inline />
      </div>
    );
  }
}

class TodoItem extends Component {
  static propTypes = {
    todo: TodoType.isRequired,
    completeTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  }

  state = {
    selected: false,
    hover: false,
    editing: false,
    showCalendar: false,
    /**
     * so the way that we're doing animation for the todo
     * getting completed is by setting this state flag
     * to true, which will add a css class that performs
     * the transition in 500ms. when we call setState({exiting: true})
     * we also call setTimeout(() => completeTodo(), 500).
     *
     * this isn't the best way to do it, but I couldn't really
     * get Transition to work or whatever
     */ 
    exiting: undefined,
  }

  componentWillReceiveProps() {
    this.setState({editing: false});
  }

  renderEditing() {
    const {todo, updateTodo} = this.props;
    const {id, name, due} = todo;
    return (
      <div style={{paddingLeft: "26px"}}>
        <TaskInput
          initialValue={name}
          submitName="Save"
          name={moment(due).format("MMM D")}
          onCancel={() => this.setState({editing: false})}
          onSubmit={(name, due, tags) => updateTodo(id, name, due, tags)} />
      </div>
    );
  }

  renderNormal() {
    const {hover, exiting, showCalendar} = this.state;
    const showOnHover = hover ? {} : { visibility: "hidden" }
    const {todo, completeTodo} = this.props;
    const {id, name, due} = todo;
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
    } else if (hover) {
      var calendar;
      if (showCalendar) {
        calendar = (
          <TodoDatePicker />
        );
      } else {
        calendar = [];
      }
      day = (
        <div onClick={e => {
          e.stopPropagation();
          this.setState(state => ({ 
            showCalendar: !state.showCalendar,
            selected: !state.selected, 
          }));
        }}>
          <span className="my-todo-icon">
            <i className="far fa-calendar"></i>
            {calendar}             
          </span>
        </div>
      );
    } else {
      day = [];
    }

    return (
      <div 
        onMouseOver={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        style={{
          display: "flex",
          cursor: "text",
        }}
        className={classNames("my-todo-container", {exiting})}
        onClick={() => this.setState({ editing: true })}
      >
        <span className="my-todo-moving-grip my-todo-icon" style={showOnHover}><i className="fas fa-grip-vertical"></i></span>
        <span className="my-todo" style={{display: "flex", justifyContent: "space-between"}}>
          <span style={{flex: "1", display: "flex"}}>
            <div onClick={e => { 
              e.stopPropagation();
              this.setState({ exiting: true });
              setTimeout(() => completeTodo(id), 500);
            }}>
              <span className="my-todo-circle"><i className="far fa-circle"></i></span>
              <div style={{display: "inline", paddingTop: "10px"}}>
                <span className="my-todo-check-mark">
                  <i className="fas fa-check"></i>
                </span>
              </div>
            </div>
            <div className="my-todo-name">{name}</div>
            <span className="my-todo-comment my-todo-icon" style={showOnHover}><i className="far fa-comment-alt"></i></span>
          </span>
          <span display={{flex: "1"}}>
            {day}
          </span>
        </span>
        <span className="my-todo-ellipsis my-todo-icon" style={showOnHover}><i className="fas fa-ellipsis-h"></i></span>
      </div>
    );
  }

  render() {
    const {name} = this.props.todo;
    return name === 'book hostel in Stockholm on Friday' || this.state.editing ? this.renderEditing() : this.renderNormal();
  }
}

const mapDispatchToProps = {
  completeTodo,
  updateTodo,
};

export default connect(null, mapDispatchToProps)(TodoItem);
