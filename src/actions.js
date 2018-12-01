export const addTodo = (name, due) => ({
  name,
  due,
  type: 'ADD_TODO'
});