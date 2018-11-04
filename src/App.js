import React, { Component } from 'react';
import TodoList from './TodoList';
import Menu from './Menu';
import logo from './logo.svg';
import './App.sass';

const todos = [
  {name: 'do laundry'},
  {name: 'write some code'},
  {name: 'clean my room'},
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="todo-navbar navbar" >
          <i class="fas fa-bell" />
        </div>
        <div className="container">
          <div class="columns is-fullheight">
            <Menu />
            <div class="todo-list column is-main-content">
              <TodoList todos={todos} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
