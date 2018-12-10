import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HoverCard extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="hover-card">
        {children}
      </div>
    ); 
  }
}

export default HoverCard;
