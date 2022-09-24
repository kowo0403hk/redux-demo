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
const reduxLogger = require("redux-logger");

const buy_cake = "buy_cake";
const buy_iceCream = "buy_iceCream";

// action creator (a function that returns an action), so whenever we need to change the action, we can do it here and the entire code base will be updated.
const buyCake = () => {
  return {
    type: buy_cake,
    info: "first redux action",
  };
};

const buyIceCream = () => {
  return {
    type: buy_iceCream,
    info: "second redux action",
  };
};

// state
const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numberOfIceCreams: 20,
};

// reducer
// it is important to know that for any action, we are return a new state object instead of mutating the original state object
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case buy_cake:
      return { ...state, numOfCakes: state.numOfCakes - 1 }; //make a new copy of the state first, then return the new state
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case buy_iceCream:
      return { ...state, numberOfIceCreams: state.numberOfIceCreams - 1 };
    default:
      return state;
  }
};

// combine all reducers
const combineReducers = redux.combineReducers;

const rootReducer = combineReducers({
  cake: cakeReducer,
  ice: iceCreamReducer,
});

// Middleware
/**
 * 1. the suggested way to extend Redux with customer functionality
 * 2. provides a third-party extension point between @dispatching an @action and the moment it reaches the @reducer
 * 3. use middleware for logging, crash reporting, performing async tasks, etc.
 */

const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

// store
// responsibilities:
// 1. holds the state of an application
const createStore = redux.createStore;
const store = createStore(rootReducer, applyMiddleware(logger));

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
  () => {} // because we are calling the store.subscribe() function first, each time we dispatch an action, the store will update and print
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

// unsubscribe to the changes
unsubscribe();

// Async actions
// performs an async API call to fetch data from an endpoint and use that data in your application
