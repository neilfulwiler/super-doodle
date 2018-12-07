import React, { Component } from 'react';
import AddTask from './AddTask';
import moment from 'moment';

class Next7Days extends Component {
  render() {
    const now = moment();
    return (
      <div className="Next7Days-container">
        <div className="title">
          <span className="is-size-4">Next 7 Days</span>
          <span className="is-size-7" style={{paddingLeft: "10px", color: "#808080"}}>
            {now.format("ddd MMM D")}
          </span>
        </div>
        <AddTask now={now} />
      </div>
    );
  }
}

export default Next7Days;