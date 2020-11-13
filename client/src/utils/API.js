import axios from "axios";
  
const api = {
  Bookmarks: {
    get: () => axios.get("/api/bookmarks/"),
    create: (o) => axios.post("/api/Bookmarks/", o),
    getOne: (id) => axios.get("/api/Bookmarks/" + id),
    update: (id, o) => axios.put("/api/Bookmarks/" + id, o),
    delete: (id) => axios.delete("/api/Bookmarks/" + id),
  },
  Connection: {
    get: () => axios.get("/api/Connection/"),
    create: (o) => axios.post("/api/Connection/", o),
    getOne: (id) => axios.get("/api/Connection/" + id),
    update: (id, o) => axios.put("/api/Connection/" + id, o),
    delete: (id) => axios.delete("/api/Connection/" + id),
  },
  Groups: {
    get: () => axios.get("/api/Groups/"),
    create: (o) => axios.post("/api/Groups/", o),
    getOne: (id) => axios.get("/api/Groups/" + id),
    update: (id, o) => axios.put("/api/Groups/" + id, o),
    delete: (id) => axios.delete("/api/Groups/" + id),
  },
  Messages: {
    get: () => axios.get("/api/Messages/"),
    create: (o) => axios.post("/api/Messages/", o),
    getOne: (id) => axios.get("/api/Messages/" + id),
    update: (id, o) => axios.put("/api/Messages/" + id, o),
    delete: (id) => axios.delete("/api/Messages/" + id),
  },
  Trips: {
    get: () => axios.get("/api/Trips/"),
    create: (o) => axios.post("/api/Trips/", o),
    getOne: (id) => axios.get("/api/Trips/" + id),
    update: (id, o) => axios.put("/api/Trips/" + id, o),
    delete: (id) => axios.delete("/api/Trips/" + id),
  },
  User: {
    get: () => axios.get("/api/User/"),
    create: (o) => axios.post("/api/User/", o),
    getOne: (id) => axios.get("/api/User/" + id),
    update: (id, o) => axios.put("/api/User/" + id, o),
    delete: (id) => axios.delete("/api/User/" + id),
    login: (o) => axios.post("/api/login", o),
    logout: () => axios.get("/api/logout"),
    signup: (o) => axios.post("/api/signup", o),
    isAuthenticated: () => axios.get("/api/authenticated"),
  },
};

export default api;
