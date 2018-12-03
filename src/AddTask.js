import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome'
import TaskInput from './TaskInput';
import { connect } from 'react-redux';
import { addTodo } from './actions';

class AddTask extends Component {
  static propTypes = {
    now: PropTypes.object.isRequired,
    addTodo: PropTypes.func.isRequired,
  }

  state = {
    hover: false,
    inputTask: false,
  };

  handleHover() {
    this.setState(state => ({
      hover: !state.hover,
    }));
  }

  render() {
    const { now, addTodo } = this.props;
    const { hover, inputTask } = this.state;
    const addTaskClass = classNames("is-size-6", {
      "add-task-hover": hover,
      "add-task-no-hover": !hover,
    });

    if (!inputTask) {
      return (
        <div 
          onMouseEnter={() => this.handleHover()}
          onMouseLeave={() => this.handleHover()}
          style={{cursor: "pointer"}}
          onClick={() => this.setState({ inputTask: true })}
        >
          <span className="add-task-icon" style={{ display: (hover ? "none" : "inline-block")}}>
            <FontAwesome name={"plus"} />
          </span>
          <span className="add-task-icon" style={{ display: (hover ? "inline-block" : "none") }}>
            <FontAwesome name={"plus-circle"}  />
          </span>
          <span 
            className={addTaskClass}
            style={{paddingLeft: "14px"}}>
            Add Task
          </span> 
        </div>
      );
    } else {
      return (
        <TaskInput 
          onCancel={() => this.setState({inputTask: false})}
          onSubmit={value => addTodo(value, new Date(Date.now()))}
          name={now.format("MMM D")}
        />
      );
    }
  }
}

const mapDispatchToProps = {
  addTodo,
};

export default connect(null, mapDispatchToProps)(AddTask);
