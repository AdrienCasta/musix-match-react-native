export const initialState = {
  collection: {
    fetching: false,
    data: null,
    error: null
  },
  discography: {
    fetching: false,
    data: null,
    error: null
  }
};

// Action Types

const ARTISTS_REQUEST = "ARTISTS_REQUEST";
const ARTISTS_SUCCESS = "ARTISTS_SUCCESS";
const ARTISTS_ERROR = "ARTISTS_ERROR";
const ARTIST_DISCOGRAPHY_REQUEST = "ARTIST_DISCOGRAPHY_REQUEST";
const ARTIST_DISCOGRAPHY_SUCCESS = "ARTIST_DISCOGRAPHY_SUCCESS";
const ARTIST_DISCOGRAPHY_ERROR = "ARTIST_DISCOGRAPHY_ERROR";

export const ActionTypes = {
  ARTISTS_REQUEST,
  ARTISTS_SUCCESS,
  ARTISTS_ERROR,
  ARTIST_DISCOGRAPHY_REQUEST,
  ARTIST_DISCOGRAPHY_SUCCESS,
  ARTIST_DISCOGRAPHY_ERROR
};

// Action Creators

const artistsRequest = () => {
  return {
    type: ARTISTS_REQUEST
  };
};

const artistsSuccess = data => {
  return {
    type: ARTISTS_SUCCESS,
    payload: data
  };
};

const artistsError = error => {
  return {
    type: ARTISTS_ERROR,
    payload: error
  };
};

const artistDiscographyRequest = id => {
  return {
    type: ARTIST_DISCOGRAPHY_REQUEST,
    id
  };
};

const artistDiscographySuccess = data => {
  return {
    type: ARTIST_DISCOGRAPHY_SUCCESS,
    payload: data
  };
};

const artistDiscographyError = error => {
  return {
    type: ARTIST_DISCOGRAPHY_ERROR,
    payload: error
  };
};

export const ActionCreators = {
  artistsRequest,
  artistsSuccess,
  artistsError,
  artistDiscographyRequest,
  artistDiscographySuccess,
  artistDiscographyError
};

// Selectors

const getArtists = state => {
  return state.artists.collection;
};

const getDiscography = state => {
  return state.artists.discography;
};

export const Selectors = {
  getArtists,
  getDiscography
};

// Reducer

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTISTS_REQUEST:
      return {
        ...state,
        collection: {
          fetching: true,
          data: null,
          error: null
        }
      };
    case ARTISTS_SUCCESS:
      return {
        ...state,
        collection: {
          fetching: false,
          data: payload,
          error: null
        }
      };
    case ARTISTS_ERROR:
      return {
        ...state,
        collection: {
          fetching: false,
          data: null,
          error: payload
        }
      };
    case ARTIST_DISCOGRAPHY_REQUEST:
      return {
        ...state,
        discography: {
          fetching: true,
          data: null,
          error: null
        }
      };
    case ARTIST_DISCOGRAPHY_SUCCESS:
      return {
        ...state,
        discography: {
          fetching: false,
          data: payload,
          error: null
        }
      };
    case ARTIST_DISCOGRAPHY_ERROR:
      return {
        ...state,
        discography: {
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
