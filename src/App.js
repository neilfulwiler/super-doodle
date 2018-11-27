import React, { Component } from 'react';
import Inbox from './Inbox';
import Today from './Today';
import Menu from './Menu';
import './App.sass';

const todos = [
  {name: 'do laundry'},
  {name: 'write some code'},
  {name: 'clean my room'},
];

class App extends Component {
  state = {
    selected: 'Inbox',
  };

  render() {
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
            <Menu onSelect={selected => this.setState({selected}) }/>
            <div className="container my-content">
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
