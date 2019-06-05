import { takeLatest, all } from "redux-saga/effects";
import musicMatchApi from "../api";

/* ------------- Types ------------- */

import { ActionTypes as ArtistsActionTypes } from "../redux/artistsRedux";

/* ------------- Sagas ------------- */

import { getArtists, getDiscography } from "./artistsSaga";

/* ------------- Connect Types To Sagas ------------- */

const newMusixMatchApi = musicMatchApi.create();

export default function* root() {
  yield all([
    takeLatest(
      ArtistsActionTypes.ARTISTS_REQUEST,
      getArtists,
      newMusixMatchApi
    ),
    takeLatest(
      ArtistsActionTypes.ARTIST_DISCOGRAPHY_REQUEST,
      getDiscography,
      newMusixMatchApi
    )
  ]);
}
