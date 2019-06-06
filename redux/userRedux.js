export const initialState = {
  login: {
    fetching: false,
    data: null,
    error: null
  }
};

// Action Types

const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export const ActionTypes = {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR
};

// Action Creators

const userLoginRequest = ({ username, password }) => {
  return {
    type: USER_LOGIN_REQUEST,
    username,
    password
  };
};

const userLoginSuccess = data => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data
  };
};

const userLoginError = error => {
  return {
    type: USER_LOGIN_ERROR,
    payload: error
  };
};

export const ActionCreators = {
  userLoginRequest,
  userLoginSuccess,
  userLoginError
};

// Selectors

const getUserLogin = state => {
  return state.user.login;
};

export const Selectors = {
  getUserLogin
};

// Reducer

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        login: {
          fetching: true,
          data: null,
          error: null
        }
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          fetching: false,
          data: payload,
          error: null
        }
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        login: {
          fetching: false,
          data: null,
          error: payload
        }
      };
    default:
      return state;
  }
};

export default reducer;
