export const addTodo = (name, due) => async (dispatch) => {
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({todo: {name, due}}),
  };
  const resp = await fetch('api/todos/create', settings);
  if (resp.ok) {
    dispatch({
      todos: [{name, due}],
      type: 'ADD_TODOS'
    });
  } else {
    // TODO handle errors
  }
};

export const completeTodo = (name) => dispatch => {
  dispatch({
    name,
    type: 'COMPLETE_TODO'
  });
};