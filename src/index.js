import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  todos: [],
};

const store = applyMiddleware(thunkMiddleware)(createStore)((state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODOS":
      return {...state, todos: state.todos.concat(action.todos)};

    case "COMPLETE_TODO":
      return {...state, todos: state.todos.filter(todo => todo.id !== action.id)};

   case "UPDATE_TODO":
      const todo = state.todos.find(todo => todo.id === action.update.id);
      return {
        ...state,
        todos: state.todos
          .filter(todo => todo.id !== action.update.id)
          .concat({
            id: todo.id,
            name: action.update.name || todo.name,
            due: action.update.due || todo.due,
            completed: action.update.completed || todo.completed,
          }),
      };

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

fetch('/api/todos')
  .then(response => response.json())
  .then(response => {
    if (response.todos) {
      store.dispatch({
        type: "ADD_TODOS",
        todos: response.todos.map(({name, dueNumber, id, completed}) => ({name, due: new Date(dueNumber), id, completed}))});
    } else {
      // TODO handle errors
    }
  });