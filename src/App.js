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
    todos: PropTypes.arrayOf(TodoType).isRequired,
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

    const navbar = (
      <div className="todo-navbar" style={{zIndex: "30", position: "relative", width: "100%"}}>
      <div className="container" style={{zIndex: "30"}}>
        <div className="columns">
          <div className="column is-2" style={{textAlign: "left", paddingLeft: "52px"}}>
            <div style={{paddingTop: "10px"}}>
              <i style={{color: "white"}} class="fa fa-wrench" aria-hidden="true"></i>
            </div>
          </div>
          <div className="column">
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <div style={{display: "flex", alignItems: "baseline"}}>
                <div style={{paddingTop: "10px", paddingLeft: "40px"}}>
                  <i style={{color: "white"}} class="fa fa-search" aria-hidden="true"></i>
                </div>
                <span 
                  style={{paddingTop: "10px", paddingLeft: "1em", marginTop: "-2px"}}
                  className="is-size-7 todo-quick-find"
                >Quick Find</span>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end"}}>
                <span style={{paddingTop: "10px", textAlign: "right"}}>
                  <i style={{color: "white"}} class="fa fa-bell" aria-hidden="true"></i>
                </span>
                <span style={{paddingTop: "10px", textAlign: "right", paddingLeft: "2em"}}>
                  <i style={{color: "white"}} class="fa fa-cog" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );

    return (
      <div className="App">
        {navbar}
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