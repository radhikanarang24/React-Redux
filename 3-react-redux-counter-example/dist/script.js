import React from 'https://cdn.skypack.dev/react@17.0.1';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.1';
const counter = (state = 0, action) =>
{
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;}

};

const Counter = ({
  value,
  onIncrement,
  onDecrement }) => /*#__PURE__*/

React.createElement("div", null, /*#__PURE__*/
React.createElement("h1", null, value), /*#__PURE__*/
React.createElement("button", { onClick: onIncrement }, "+"), /*#__PURE__*/
React.createElement("button", { onClick: onDecrement }, "-"));



const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(Counter, {
    value: store.getState(),
    onIncrement: () =>
    store.dispatch({
      type: 'INCREMENT' }),


    onDecrement: () =>
    store.dispatch({
      type: 'DECREMENT' }) }),



  document.getElementById("root"));

};


store.subscribe(render);
render();

/*Let's recap how this application works. The counter component is what I call a dump component. It does not contain any business logic. It only specifies how the current application state transforms into renderable output and how the callbacks, passed via props, are bound to the event handlers.

When we render a counter, we specify that its value should be taken from the Redux store current state. When the user presses "increment" or "decrement," we dispatch corresponding action to the Redux store. Our reducer specifies how the next state is calculated based on the current state and the action being dispatched.

Finally, we subscribe to the Redux store, so our render function runs anytime the state changes, so the counter gets the current state.*/