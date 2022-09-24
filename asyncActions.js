// Async actions
// performs an async API call to fetch data from an endpoint and use that data in your application

/**
 * libraries needed:
 * @axios => requests to an API endpoint
 * @reduxthunk => redux-thunk define async action creators (middleware)
 */
const axios = require("axios");
const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").default;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// actions
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

// aysnc action creator => return a function (not pure, can have side effects)
const fetchUsers = () => {
  return async function (dispatch) {
    dispatch(fetchUsersRequest());
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(fetchUsersSuccess(data));
    } catch (err) {
      dispatch(fetchUsersError(err.message));
    }
  };
};

// reducer functions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: "" };
    case FETCH_USERS_ERROR:
      return { ...state, loading: false, users: [], error: action.payload };
    default:
      return state;
  }
};

// store
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
