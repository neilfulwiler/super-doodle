import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome'

class TaskInput extends Component {
  static propTypes = {
    now: PropTypes.object.isRequired,
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
    return (
      <table style={{width: "100%"}} className="my-submit-table">
        <tbody>
        <tr>
          <td className="submit">
            <a className="button my-add-task-button">Add Task</a>
            <a className="button my-cancel-button">Cancel</a>
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

class Today extends Component {
  state = {
    hover: false,
    inputTask: true,
  };

  handleHover() {
    this.setState(state => ({
      hover: !state.hover,
    }));
  }

  render() {
    const { hover, inputTask } = this.state;
    const addTaskClass = classNames("is-size-6", {
      "add-task-hover": hover,
      "add-task-no-hover": !hover,
    });

    const now = moment(); 

    var task;
    if (!inputTask) {
      task = (
        <div 
          onMouseEnter={() => this.handleHover()}
          onMouseLeave={() => this.handleHover()}
          style={{marginTop: "-14px"}}
          onClick={() => this.setState({ inputTask: true })}
        >
          <span style={{ display: (hover ? "none" : "inline-block") }}>
            <FontAwesome name={"plus"} />
          </span>
          <span style={{ display: (hover ? "inline-block" : "none") }}>
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
      task = <TaskInput now={now}/>;
    }

    return (
      <div className="today-container">
        <div className="title">
          <span className="is-size-4">Today</span>
          <span className="is-size-7" style={{paddingLeft: "10px", color: "#808080"}}>
            {now.format("ddd MMM D")}
          </span>
        </div>
        {task}
      </div>
    );
  }
}

export default Today;
