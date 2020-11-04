import axios from "axios";

const API = {
  getBookmarks: () => {
    return axios.get("/api/bookmarks");
  },
  getBook: (id) => {
    return axios.get("/api/bookmarks/" + id);
  },
  deleteBook: (id) => {
    return axios.delete("/api/bookmarks/" + id);
  },
  // Saves a book to the database
  saveBook: (bookData) => {
    return axios.post("/api/bookmarks", bookData);
  },
};

export default API;