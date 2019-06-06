import { takeLatest, all } from "redux-saga/effects";
import api from "../api";

/* ------------- Types ------------- */

import { ActionTypes as ArtistsActionTypes } from "../redux/artistsRedux";
import { ActionTypes as UserActionTypes } from "../redux/userRedux";

/* ------------- Sagas ------------- */

import { getArtists, getDiscography } from "./artistsSaga";
import { login } from "./loginSaga";

/* ------------- Connect Types To Sagas ------------- */

const Api = api.create();

export default function* root() {
  yield all([
    takeLatest(ArtistsActionTypes.ARTISTS_REQUEST, getArtists, Api),
    takeLatest(
      ArtistsActionTypes.ARTIST_DISCOGRAPHY_REQUEST,
      getDiscography,
      Api
    ),
    takeLatest(UserActionTypes.USER_LOGIN_REQUEST, login, Api)
  ]);
}
