function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}import React from 'https://cdn.skypack.dev/react@17.0.1';
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
  children,
  onClick }) =>
{
  if (currentFilter === filter)
  {
    return /*#__PURE__*/React.createElement("span", null, children);
  }

  return /*#__PURE__*/(
    React.createElement("a", { href: "#", onClick: e => {
        e.preventDefault();
        onClick(filter);
      } },

    children));


};

const AddTodo = ({
  onAddClick }) =>
{

  let input;
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("input", { ref: node => {//the react callback ref API where ref is a function, it gets the node corresponding to the ref, and I'm saving that node with some name. 
        input = node;
      } }), /*#__PURE__*/
    React.createElement("button", { onClick: () => {
        onAddClick(input.value);
        input.value = '';
      } }, "Add Todo")));





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

const Todo = ({
  onClick,
  completed,
  text }) => /*#__PURE__*/

React.createElement("li", { onClick: onClick,
  style: { textDecoration: completed ? 'line-through' : 'none' } },
text);



const TodoList = ({
  todos,
  onTodoClick }) => /*#__PURE__*/

React.createElement("ul", null,
todos.map((todo) => /*#__PURE__*/
React.createElement(Todo, _extends({ key: todo.id },
todo, {
  onClick: () => onTodoClick(todo.id) }))));





const Footer = ({
  visibilityFilter,
  onFilterClick }) => /*#__PURE__*/

React.createElement("p", null, "Show:",

' ', /*#__PURE__*/
React.createElement(FilterLink, { filter: "SHOW_ALL", currentFilter: visibilityFilter, onClick: onFilterClick }, " All "),
' | ', /*#__PURE__*/
React.createElement(FilterLink, { filter: "SHOW_ACTIVE", currentFilter: visibilityFilter, onClick: onFilterClick }, " Active "),
' | ', /*#__PURE__*/
React.createElement(FilterLink, { filter: "SHOW_COMPLETED", currentFilter: visibilityFilter, onClick: onFilterClick }, " Completed "));



let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => /*#__PURE__*/

React.createElement("div", null, /*#__PURE__*/
React.createElement(AddTodo, {
  onAddClick: (text) =>
  store.dispatch({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text }) }), /*#__PURE__*/



React.createElement(TodoList, {
  todos: getVisibleTodos(todos, visibilityFilter),
  onTodoClick: id => store.dispatch({
    type: 'TOGGLE_TODO',
    id }) }), /*#__PURE__*/



React.createElement(Footer, {
  visibilityFilter: visibilityFilter,
  onFilterClick: (filter) =>
  store.dispatch({
    type: 'SET_VISIBILTY_FILTER',
    filter }) }));







const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(TodoApp,
  store.getState()),

  document.getElementById("root"));

};

store.subscribe(render);
render();