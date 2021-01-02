import React from 'https://cdn.skypack.dev/react@17.0.1';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1';
const todo = (state, action) =>
{
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false };

    case 'TOGGLE_TODO':
      if (state.id !== action.id)
      {
        return state;
      }
      return {
        ...state,
        completed: !state.completed };

    default:
      return state;}

};

const visibilityFilter = (
state = 'SHOW_ALL',
action) =>
{
  switch (action.type) {
    case 'SET_VISIBILTY_FILTER':
      return action.filter;
    default:
      return state;}

};


const todos = (state = [], action) =>
{
  switch (action.type) {
    case 'ADD_TODO':
      return [...state,
      todo(undefined, action)];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;}

};


const { combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter });



const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

const FilterLink = ({
  filter,
  currentFilter,
  children }) =>
{
  if (currentFilter === filter)
  {
    return /*#__PURE__*/React.createElement("span", null, children);
  }

  return /*#__PURE__*/(
    React.createElement("a", { href: "#", onClick: e => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILTY_FILTER',
          filter });

      } },

    children));


};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);}

};

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("input", { ref: node => {//the react callback ref API where ref is a function, it gets the node corresponding to the ref, and I'm saving that node with some name. 
          this.input = node;
        } }), /*#__PURE__*/
      React.createElement("button", { onClick: () => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextTodoId++ });

        } }, "Add Todo"), /*#__PURE__*/


      React.createElement("ul", null,
      visibleTodos.map((todo) => /*#__PURE__*/
      React.createElement("li", { key: todo.id, onClick: () => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id });

        },
        style: { textDecoration: todo.completed ? 'line-through' : 'none' } },

      todo.text))), /*#__PURE__*/



      React.createElement("p", null, "Show:",

      ' ', /*#__PURE__*/
      React.createElement(FilterLink, { filter: "SHOW_ALL", currentFilter: visibilityFilter }, " All "),
      ' ', /*#__PURE__*/
      React.createElement(FilterLink, { filter: "SHOW_ACTIVE", currentFilter: visibilityFilter }, " Active "),
      ' ', /*#__PURE__*/
      React.createElement(FilterLink, { filter: "SHOW_COMPLETED", currentFilter: visibilityFilter }, " Completed "))));



  }}

const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(TodoApp,
  store.getState()),

  document.getElementById("root"));

};

store.subscribe(render);
render();