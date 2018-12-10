import React, { Component } from 'react';
import AddTask from './AddTask';
import moment from 'moment';

class Next7Days extends Component {
  render() {
    const now = moment();
    return (
      <div className="next7days-container">
        <div className="title">
          <span className="is-size-4">Next 7 Days</span>
        </div>
        <div style={{paddingTop: "1em"}}>
          <AddTask now={now} />
        </div>
      </div>
    );
  }
}

export default Next7Days;
