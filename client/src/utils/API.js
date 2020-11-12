import axios from "axios";

const api = {
  bookmarks: {
    get: () => axios.get("/api/bookmarks/"),
    create: (o) => axios.post("/api/bookmarks/", o),
    getOne: (id) => axios.get("/api/bookmarks/:id", id),
    update: (id, o) => axios.put("/api/bookmarks/:id", id, o),
    delete: (id) => axios.delete("/api/bookmarks/:id", id),
  },
  connection: {
    get: () => axios.get("/api/connection/"),
    create: (o) => axios.post("/api/connection/", o),
    getOne: (id) => axios.get("/api/connection/:id", id),
    update: (id, o) => axios.put("/api/connection/:id", id, o),
    delete: (id) => axios.delete("/api/connection/:id", id),
  },
  groups: {
    get: () => axios.get("/api/groups/"),
    create: (o) => axios.post("/api/groups/", o),
    getOne: (id) => axios.get("/api/groups/:id", id),
    update: (id, o) => axios.put("/api/groups/:id", id, o),
    delete: (id) => axios.delete("/api/groups/:id", id),
  },
  messages: {
    get: () => axios.get("/api/messages/"),
    create: (o) => axios.post("/api/messages/", o),
    getOne: (id) => axios.get("/api/messages/:id", id),
    update: (id, o) => axios.put("/api/messages/:id", id, o),
    delete: (id) => axios.delete("/api/messages/:id", id),
  },
  trips: {
    get: () => axios.get("/api/trips/"),
    create: (o) => axios.post("/api/trips/", o),
    getOne: (id) => axios.get("/api/trips/:id", id),
    update: (id, o) => axios.put("/api/trips/:id", id, o),
    delete: (id) => axios.delete("/api/trips/:id", id),
  },
  users: {
    get: () => axios.get("/api/user/"),
    create: (o) => axios.post("/api/user/", o),
    getOne: (id) => axios.get("/api/user/:id", id),
    update: (id, o) => axios.put("/api/user/:id", id, o),
    delete: (id) => axios.delete("/api/user/:id", id),
    isAuthenticated: (o) => axios.get("/api/authenticated"),
    login: (o) => axios.post("/api/login", o),
  },
};

export default api;
