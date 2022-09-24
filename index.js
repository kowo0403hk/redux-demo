// Redux comcept
// Redux is a predictable state container for JS apps. (Not only for React)

/**
 *  @THREE core concepts:
 *  1. @Store --> holds the state of your application (e.g. cake store)
 *        and allows access to state via getState()
 *        and allows state to be updated via dispatch(action)
 *        can register listeners via subscribe(listener)
 *        can handle unregistering of listeners via the function returned by subscribe(listener)
 *  2. @Action --> describes what happened (e.g. buy a cake)
 *  3. @Reducer --> ties the store and actions together (e.g. shopkeeper give you the cake and reduce the store's inventory)
 */

/**
 * @THREE principles:
 *
 * @First --> The state of your whole application is stored in an object tree within a single store
 * e.g. @cakeStore = {number_of_cakes: 10}
 *
 * @Second --> The only way to change the state is to dispatch an action (a function), an object describing what happened. You are not allowed to directly update the state object.
 * e.g. @action = {type: buy_cake, payload: num}
 *
 * @Third --> To specify how the state tree is transformed by actions, you write pure reducers (pure functions). It accepts state and action as arguments, and returns the next state of the application.
 * e.g. @reducer = (state, action) => newState
 * e.g.
 * const reducer = (state, action) => {
 *    switch (action.type) {
 *      case buy_cake: return {number_of_cakes: state.number_of_cakes - 1}}}
 */
// use the ES6 syntax if we are working on React
// import {createStore} from "redux";

// else, we can just use the common JS syntax
const redux = require("redux");

const buy_cake = "buy_cake";

const action = {
  type: buy_cake,
  info: "first redux action",
};

// action creator (a function that returns an action), so whenever we need to change the action, we can do it here and the entire code base will be updated.
const buyCake = () => {
  return action;
};

// state
const initialState = {
  numOfCakes: 10,
};

// reducer
// it is important to know that for any action, we are return a new state object instead of mutating the original state object
const buyCakeReducer = (state = initialState, action) => {
  switch (action.type) {
    case buy_cake:
      return { ...state, numOfCakes: state.numOfCakes - 1 }; //make a new copy of the state first, then return the new state
    default:
      return state;
  }
};

// store
// responsibilities:
// 1. holds the state of an application
const createStore = redux.createStore;
const store = createStore(buyCakeReducer);

// 2. allows access to state via getState()
console.log("Initial state", store.getState());

// 3. allows state to be updated via dispatch(action)
// store.dispatch(buyCake());
// store.dispatch(buyCake());
// store.dispatch(buyCake());

// 4. registers listeners via subscribe(listener) -> allow the app to subscribe the changes of the store
// store.subscribe(() => console.log("updated state", store.getState()));

// 5. handles unregistering of listeners via the function returned by subscribe(listener)
const unsubscribe = store.subscribe(
  () => console.log("Updated state", store.getState()) // because we are calling the store.subscribe() function first, each time we dispatch an action, the store will update and print
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

// unsubscribe to the changes
unsubscribe();
