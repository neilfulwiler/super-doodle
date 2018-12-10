export const addTodo = (name, due) => async (dispatch) => {
  const id = Math.floor(Math.random() * 1000000000);
  const completed = false;
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({todo: {
      name,
      due: due.getTime(),
      id,
    }}),
  };
  const resp = await fetch('api/todos/create', settings);
  if (resp.ok) {
    dispatch({
      todos: [{name, due, id, completed}],
      type: 'ADD_TODOS'
    });
  } else {
    // TODO handle errors
  }
};

export const updateTodo = (id, name) => async (dispatch) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({update: {id, name}}),
  };
  const resp = await fetch('api/todos/update', settings);
  if (resp.ok) {
    dispatch({
      update: {id, name},
      type: 'UPDATE_TODO'
    });
  } else {
    // TODO handle errors
  }
};

export const completeTodo = (id) => async (dispatch) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({update: {id, completed: true}}),
  };
  const resp = await fetch('api/todos/update', settings);
  if (resp.ok) {
    dispatch({
      id,
      type: 'COMPLETE_TODO'
    });
  } else {
    // TODO handle errors
  }

};