import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TodoType } from './TodoItem';
import classNames from 'classnames';

class Menu extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(TodoType).isRequired,
  };

  state = {
    highlighted: null,
  };

  render() {
    const {onSelect, selected, todos} = this.props;
    const {highlighted} = this.state;

    const menuItems = [
      [
        "Inbox",
        <span className="navbar-icons fas fa-inbox"/>, 
        <span className="is-size-7" style={{color: "#777", paddingLeft: "1em"}}>{todos.filter(todo => !todo.completed).length}</span>
      ],
      ["Today", <span className="navbar-icons fas fa-calendar"/>],
      ["Next 7 Days", <span className="navbar-icons fas fa-calendar-alt"/>],
      ["Projects", <span className="navbar-icons fas fa-caret-right"/>],
      ["Labels", <span className="navbar-icons fas fa-caret-right"/>],
      ["Filters", <span className="navbar-icons fas fa-caret-right"/>],
    ];

    return (
      <div className="column is-2 is-sidebar-menu is-hidden-mobile" style={{paddingRight: "0px"}}>
        <aside className="menu">
        <ul className="menu-list">
          {menuItems.map(([name, icon, extra]) => (
            <li 
              key={name}
              onMouseEnter={() => this.setState(state => ({ highlighted: name }))}
              onMouseLeave={() => this.setState(state => {
                if (state.highlighted === name) {
                  return { highlighted: null};
                } else {
                  return state;
                }
              })}
            >
              <a 
                className={classNames({"highlighted": [highlighted, selected].includes(name)})}
                onClick={() => onSelect(name)}
              >
                {icon}<span className={classNames({"is-bold": selected === name})}>{name}</span>{extra}
              </a>
            </li>
          ))}
        </ul>
        </aside>
      </div>);
  }
}

export default Menu;
