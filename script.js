function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
      ...state, {
        id: action.id,
        text: action.text,
        completed: false }];


    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed };

      });
    default:
      return state;}

};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
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
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const Todo = ({
  onClick,
  completed,
  text }) =>

React.createElement("li", {
  className:
  completed ?
  'todo todo--completed' :
  'todo',

  onClick: onClick },

React.createElement("span", { className: "todo__content" },
text));




const TodoList = ({
  todos,
  onTodoClick }) =>
{
  return (
    React.createElement(ReactCSSTransitionGroup, {
      className: "todo-list",
      component: "ul",
      transitionName: "todo",
      transitionEnterTimeout: 750,
      transitionLeaveTimeout: 750 },

    todos.map((todo) =>
    React.createElement(Todo, _extends({
      key: todo.id },
    todo, {
      onClick: () => onTodoClick(todo.id) })))));




};

const AddTodo = ({
  onAddClick }) =>
{
  let input;
  return (
    React.createElement("div", { className: "add-todo" },
    React.createElement("input", {
      className: "add-todo__input",
      ref: node => {
        input = node;
      } }),
    React.createElement("button", {
      className: "add-todo__btn",
      onClick: () => {
        input.value ?
        onAddClick(input.value) :
        false;
        input.value = '';
      } },
    React.createElement("i", { className: "fa fa-plus" }))));



};

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick }) =>
{
  return (
    React.createElement("a", {
      className: "filter__link",
      href: "#",
      onClick: e => {
        e.preventDefault();
        onClick(filter);
      } },

    children));


};

const Footer = ({
  visibilityFilter,
  onFilterClick }) =>

React.createElement("div", { className: "filters" },
React.createElement(FilterLink, {
  filter: "SHOW_ALL",
  currentFilter: visibilityFilter,
  onClick: onFilterClick },

React.createElement("i", { className: "fa fa-list-ul" })),

React.createElement(FilterLink, {
  filter: "SHOW_ACTIVE",
  currentFilter: visibilityFilter,
  onClick: onFilterClick },

React.createElement("i", { className: "fa fa-times" })),

React.createElement(FilterLink, {
  filter: "SHOW_COMPLETED",
  currentFilter: visibilityFilter,
  onClick: onFilterClick },

React.createElement("i", { className: "fa fa-check" })));




const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
      t => t.completed);

    case 'SHOW_ACTIVE':
      return todos.filter(
      t => !t.completed);}


};

let nextTodoId = 0;
const TodoApp = ({
  todos,
  visibilityFilter }) =>

React.createElement("div", { className: "todo-app" },
React.createElement("h1", { className: "todo-title" }, "Got any plans?"),
React.createElement(TodoList, {
  todos:
  getVisibleTodos(
  todos,
  visibilityFilter),


  onTodoClick: (id) =>
  store.dispatch({
    type: 'TOGGLE_TODO',
    id }) }),



React.createElement(AddTodo, {
  onAddClick: (text) =>
  store.dispatch({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text }) }),



React.createElement(Footer, {
  visibilityFilter: visibilityFilter,
  onFilterClick: (filter) =>
  store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter }) }));






const render = () => {
  ReactDOM.render(
  React.createElement(TodoApp,
  store.getState()),

  document.getElementById('root'));

};

store.subscribe(render);
render();

/*
           * Tests
           */

// const testAddTodo = () => {
// 	const stateBefore = [];
// 	const action = {
// 		type: 'ADD_TODO',
// 		id: 0,
// 		text: 'Learn Redux'
// 	};
// 	const stateAfter = [
// 		{
// 			id: 0,
// 			text: 'Learn Redux',
// 			completed: false
// 		}
// 	];
// 	expect(
// 		todos(stateBefore, action) 
// 	).toEqual(stateAfter);
// };

// const testToggleTodo = () => {
// 	const stateBefore = [
// 		{
// 			id: 0,
// 			text: 'Learn Redux',
// 			completed: false
// 		},
// 		{
// 			id: 1,
// 			text: 'Profit!',
// 			completed: false
// 		}
// 	];
// 	const action = {
// 		type: 'TOGGLE_TODO',
// 		id: 1
// 	};
// 	const stateAfter = [
// 		{
// 			id: 0,
// 			text: 'Learn Redux',
// 			completed: false
// 		},
// 		{
// 			id: 1,
// 			text: 'Profit!',
// 			completed: true
// 		}
// 	];
// 	expect(
// 		todos(stateBefore, action) 
// 	).toEqual(stateAfter);
// };

// testAddTodo();
// testToggleTodo();

// console.log('All Tests Passed!');