import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  todos: [
    {name: 'do laundry', due: new Date(Date.now())},
    {name: 'write some code', due: new Date(Date.parse("November 30, 2018"))},
    {name: 'clean my room', due: new Date(Date.parse("December 31, 2018"))},
  ],
};

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {...state, todos: state.todos.concat({name: action.name, due: action.due})};

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
