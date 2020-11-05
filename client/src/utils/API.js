import axios from "axios";

const API = {
  Bookmarks: {
    get: () => {
      return axios.get("/api/");
    },
    getSingle: (id) => {
      return axios.get("/api/bookmarks/" + id);
    }
  }
};

export default API;