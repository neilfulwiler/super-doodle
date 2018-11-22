import React, { Component } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome'

class Today extends Component {
  state = {
    hover: false,
  };

  handleHover() {
    this.setState(state => ({
      hover: !state.hover,
    }));
  }

  render() {
    const { hover } = this.state;
    const addTaskClass = classNames("is-size-6", {
      "add-task-hover": hover,
      "add-task-no-hover": !hover,
    });

    return (
      <div className="today-container">
        <div className="title">
          <span className="is-size-4">Today</span>
          <span className="is-size-7" style={{paddingLeft: "10px", color: "#808080"}}>
            {moment().format("ddd MMM D")}
          </span>
        </div>
        <div 
          onMouseEnter={() => this.handleHover()}
          onMouseLeave={() => this.handleHover()}
          style={{marginTop: "-14px"}}
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
      </div>
    );
  }
}

export default Today;
