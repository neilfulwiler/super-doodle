export const addTodo = (name, due) => ({
  name,
  due,
  type: 'ADD_TODO'
});

export const completeTodo = (name) => ({
  name,
  type: 'COMPLETE_TODO'
});