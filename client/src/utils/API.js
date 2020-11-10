import axios from "axios";

const api = {
  bookmarks: {
    get: () => axios.get("/api/bookmarks/"),
    create: () => axios.get("/api/bookmarks/"),
    getOne: (id) => axios.get("/api/bookmarks/:id"),
    update: (id) => axios.get("/api/bookmarks/:id"),
    delete: (id) => axios.get("/api/bookmarks/:id"),
  },
  groups: {
    get: () => axios.get("/api/group/"),
    create: () => axios.get("/api/group/"),
    getOne: (id) => axios.get("/api/group/:id"),
    update: (id) => axios.get("/api/group/:id"),
    delete: (id) => axios.get("/api/group/:id"),
  },
  messages: {
    get: () => axios.get("/api/messages/"),
    create: () => axios.get("/api/messages/"),
    getOne: (id) => axios.get("/api/messages/:id"),
    update: (id) => axios.get("/api/messages/:id"),
    delete: (id) => axios.get("/api/messages/:id"),
  },
  trips: {
    get: () => axios.get("/api/trips/"),
    create: () => axios.get("/api/trips/"),
    getOne: (id) => axios.get("/api/trips/:id"),
    update: (id) => axios.get("/api/trips/:id"),
    delete: (id) => axios.get("/api/trips/:id"),
  },
  users: {
    get: () => axios.get("/api/user/"),
    create: () => axios.get("/api/user/"),
    getOne: (id) => axios.get("/api/user/:id"),
    update: (id) => axios.get("/api/user/:id"),
    delete: (id) => axios.get("/api/user/:id"),
  },
};

export default api;