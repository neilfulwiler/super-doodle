import React, { Component } from 'react';
import AddTask from './AddTask';
import moment from 'moment';

class Today extends Component {
  render() {
    const now = moment();
    return (
      <div className="today-container">
        <div className="title">
          <span className="is-size-4">Today</span>
          <span className="is-size-7" style={{paddingLeft: "10px", color: "#808080"}}>
            {now.format("ddd MMM D")}
          </span>
          
        </div>
        <div style={{paddingTop: "1em"}}>
          <AddTask now={now} />
        </div>
      </div>
    );
  }
}

export default Today;
