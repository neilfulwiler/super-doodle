export const addTodo = (name, due) => ({
  todos: [{name, due}],
  type: 'ADD_TODOS'
});

export const completeTodo = (name) => ({
  name,
  type: 'COMPLETE_TODO'
});