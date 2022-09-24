// Redux comcept
// Redux is a predictable state container for JS apps. (Not only for React)

/**
 *  @THREE core concepts:
 *  1. @Store --> holds the state of your application (e.g. cake store)
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
const buy_cake = "buy_cake";

const action = {
  type: buy_cake,
  info: "first redux action",
};

// action creator (a function that returns an action)
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
