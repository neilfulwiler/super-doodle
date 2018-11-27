import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome'

class TaskInput extends Component {
  static propTypes = {
    now: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  onChange(e) {
    const {value} = e.currentTarget;
    this.setState({value});
  }

  renderInput() {
    const {now} = this.props;
    const {value} = this.state;
    const defaultValue = value === '';
    const placeholder = 
      defaultValue 
      ? (<span className="my-placeholder">e.g. Conference Wednesday at 15 #Meeting</span>)
      : [];
    return (
      <div className="my-task-table">
        <table style={{width: "100%"}}>
          <tbody>
          <tr>
            <td>
              {placeholder}
              <input 
                tabIndex="1"
                value={value}
                onChange={e => this.onChange(e)}
                className="my-input"
                style={{width: "100%"}}/>
            </td>
            <td>
              <div id="date">{now.format("MMM D")}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderButtons() {
    const {onCancel} = this.props;
    return (
      <table style={{width: "100%"}} className="my-submit-table">
        <tbody>
        <tr>
          <td className="submit">
            <a className="button my-add-task-button">Add Task</a>
            <a 
              className="button my-cancel-button"
              onClick={() => onCancel()}
            >Cancel</a>
          </td>
          <td className="extra">
            <span className="icons"><i className="fas fa-list"></i></span>
            <span className="icons"><i className="far fa-clock"></i></span>
            <span className="icons"><i className="far fa-flag"></i></span> 
          </td>
        </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const input = this.renderInput();
    const buttons = this.renderButtons();
    return (
      <div>
        {input}
        {buttons}
      </div>
    );
  }
}

class AddTask extends Component {
  static propTypes = {
    now: PropTypes.object.isRequired,
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
    const { now } = this.props;
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
          now={now}
          onCancel={() => this.setState({inputTask: false})}
        />
      );
    }
  }
}

export default AddTask;
