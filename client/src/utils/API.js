import axios from "axios";

const api = {
  bookmarks: {
    get: () => axios.get("/api/bookmarks/"),
    create: (o) => axios.post("/api/bookmarks/", o),
    getOne: (id) => axios.get("/api/bookmarks/" + id),
    update: (id, o) => axios.put("/api/bookmarks/" + id, o),
    delete: (id) => axios.delete("/api/bookmarks/" + id),
  },
  connection: {
    get: () => axios.get("/api/connection/"),
    create: (o) => axios.post("/api/connection/", o),
    getOne: (id) => axios.get("/api/connection/" + id),
    update: (id, o) => axios.put("/api/connection/" + id, o),
    delete: (id) => axios.delete("/api/connection/" + id),
  },
  groups: {
    get: () => axios.get("/api/groups/"),
    create: (o) => axios.post("/api/groups/", o),
    getOne: (id) => axios.get("/api/groups/" + id),
    update: (id, o) => axios.put("/api/groups/" + id, o),
    delete: (id) => axios.delete("/api/groups/" + id),
  },
  messages: {
    get: () => axios.get("/api/messages/"),
    create: (o) => axios.post("/api/messages/", o),
    getOne: (id) => axios.get("/api/messages/" + id),
    update: (id, o) => axios.put("/api/messages/" + id, o),
    delete: (id) => axios.delete("/api/messages/" + id),
  },
  trips: {
    get: () => axios.get("/api/trips/"),
    create: (o) => axios.post("/api/trips/", o),
    getOne: (id) => axios.get("/api/trips/" + id),
    update: (id, o) => axios.put("/api/trips/" + id, o),
    delete: (id) => axios.delete("/api/trips/" + id),
  },
  users: {
    get: () => axios.get("/api/user/"),
    create: (o) => axios.post("/api/user/", o),
    getOne: (id) => axios.get("/api/user/" + id),
    update: (id, o) => axios.put("/api/user/" + id, o),
    delete: (id) => axios.delete("/api/user/" + id),
  },
};

export default api;
