import { call, put, select } from "redux-saga/effects";
import { NavigationActions } from "react-navigation";

import { ActionCreators } from "../redux/userRedux";

export function* login(api, action) {
  const { username, password } = action;
  const { data: status } = yield call(api.login, username, password);
  if (status === "success") {
    yield put(ActionCreators.userLoginSuccess(status));
  } else {
    yield put(ActionCreators.userLoginError(status));
  }
}
