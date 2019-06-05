import endoints from "./endpoints";
import axios from "axios";

const API_KEY = "e595a1734e95171b8e1c87efbf0f9d96";

const create = (baseURL = "https://api.musixmatch.com/ws/1.1/") => {
  const getArtists = () => {
    return axios.get(`${baseURL}${endoints.musixMatch.topArtists}`, {
      params: {
        apikey: API_KEY,
        page: 1,
        page_size: 10,
        country: "fr"
      }
    });
  };

  const getDiscography = artistId => {
    return axios.get(`${baseURL}${endoints.musixMatch.discography}`, {
      params: {
        apikey: API_KEY,
        artist_id: artistId,
        g_album_name: 1,
        page_size: 100
      }
    });
  };

  return {
    getArtists,
    getDiscography
  };
};

export default {
  create
};
