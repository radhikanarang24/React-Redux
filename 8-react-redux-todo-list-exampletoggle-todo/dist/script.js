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

let nextTodoId = 0;
class TodoApp extends Component {
  render() {
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
      this.props.todos.map((todo) => /*#__PURE__*/
      React.createElement("li", { key: todo.id, onClick: () => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: todo.id });

        },
        style: { textDecoration: todo.completed ? 'line-through' : 'none' } },

      todo.text)))));





  }}

const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(TodoApp, {
    todos: store.getState().todos }),

  document.getElementById("root"));

};

store.subscribe(render);
render();