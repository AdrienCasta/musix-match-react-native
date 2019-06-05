import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import artistsReducer from "./artistsRedux";

import sagas from "../sagas";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(
  combineReducers({ artists: artistsReducer }),
  applyMiddleware(sagaMiddleware)
);

// then run the saga
sagaMiddleware.run(sagas);

export default store;
