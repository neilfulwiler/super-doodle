import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    const select = item => () => this.props.onSelect(item);
    return (
    <div className="column is-2 is-sidebar-menu is-hidden-mobile">
      <aside className="menu">
      <ul className="menu-list">
        <li><a onClick={select("Inbox")}><span className="navbar-icons fas fa-inbox"/>Inbox</a></li>
        <li><a onClick={select("Today")}><span className="navbar-icons fas fa-calendar"/>Today</a></li>
        <li><a onClick={select("Next 7 Days")}><span className="navbar-icons fas fa-calendar-alt"/>Next 7 Days</a></li>
        <li><a onClick={select("Projects")}><span className="navbar-icons fas fa-caret-right"/>Projects</a></li>
        <li><a onClick={select("Lables")}><span className="navbar-icons fas fa-caret-right"/>Labels</a></li>
        <li><a onClick={select("Filters")}><span className="navbar-icons fas fa-caret-right"/>Filters</a></li>
      </ul>
      </aside>
    </div>);
  }
}

export default Menu;
