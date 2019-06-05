import { call, put, select } from "redux-saga/effects";
import { NavigationActions } from "react-navigation";

import { ActionCreators, Selectors } from "../redux/artistsRedux";

export function* getArtists(api) {
  const {
    data: { message }
  } = yield call(api.getArtists);
  if (message.header.status_code === 200) {
    yield put(ActionCreators.artistsSuccess(message.body.artist_list));
  } else {
    yield put(
      ActionCreators.competitionsError({
        status: message.header.status_code,
        error: "KO"
      })
    );
  }
}
export function* getDiscography(api, action) {
  const { id } = action;
  const {
    data: { message }
  } = yield call(api.getDiscography, id);
  if (message.header.status_code === 200) {
    yield put(ActionCreators.artistDiscographySuccess(message.body.album_list));
  } else {
    yield put(
      ActionCreators.artistDiscographyError({
        status: message.header.status_code,
        error: "KO"
      })
    );
  }
}
