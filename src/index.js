import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  todos: [
    {name: 'do laundry'},
    {name: 'write some code'},
    {name: 'clean my room'},
  ],
};

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {...state, todos: state.todos.concat({name: action.name})};

    default:
      return state;
  }
});

ReactDOM.render(
  <Provider store={store} >
    <App /> 
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
