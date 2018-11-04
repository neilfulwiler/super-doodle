import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Menu extends Component {

  render() {
    return (
    <div class="column is-2 is-sidebar-menu is-hidden-mobile">
      <aside class="menu">
      <ul class="menu-list">
        <li><a><span class="navbar-icons fas fa-inbox"/>Inbox</a></li>
        <li><a><span class="navbar-icons fas fa-calendar"/>Today</a></li>
        <li><a><span class="navbar-icons fas fa-calendar-alt"/>Next 7 Days</a></li>
        <li><a><span class="navbar-icons fas fa-caret-right"/>Projects</a></li>
        <li><a><span class="navbar-icons fas fa-caret-right"/>Labels</a></li>
        <li><a><span class="navbar-icons fas fa-caret-right"/>Filters</a></li>
      </ul>
      </aside>
    </div>);
  }
}

export default Menu;
