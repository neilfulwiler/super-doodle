import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inbox from './Inbox';
import Today from './Today';
import Menu from './Menu';
import { TodoType } from './TodoItem';
import { connect } from 'react-redux';
import './App.sass';

class App extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(TodoType).required,
  };

  state = {
    selected: 'Inbox',
  };

  render() {
    const {todos} = this.props;
    const {selected} = this.state;

    var content;
    if (selected === 'Today') {
      content = <Today />;
    } else {
      content = <Inbox todos={todos} />;
    }

    return (
      <div className="App">
        <div className="todo-navbar navbar" >
          <i className="fas fa-bell" />
        </div>
        <div className="container my-container">
          <div className="columns is-fullheight">
            <Menu 
              onSelect={selected => this.setState({selected}) }
              selected={selected}
              todos={todos}
            />
            <div className="container my-content">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    todos: state.todos,
  };
}

export default connect(mapStateToProps)(App);