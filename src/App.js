import React, { Component } from 'react';
import TodoList from './TodoList';
import logo from './logo.svg';
import './App.css';

const todos = [
  {name: 'do laundry'},
  {name: 'write some code'},
  {name: 'clean my room'},
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TodoList todos={todos} />
        </header>
      </div>
    );
  }
}

export default App;
