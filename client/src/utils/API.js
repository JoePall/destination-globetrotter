import axios from "axios";
  
const api = {
  bookmark: {
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
  group: {
    get: () => axios.get("/api/group/"),
    create: (o) => axios.post("/api/group/", o),
    getOne: (id) => axios.get("/api/group/" + id),
    update: (id, o) => axios.put("/api/group/" + id, o),
    delete: (id) => axios.delete("/api/group/" + id),
  },
  message: {
    get: () => axios.get("/api/message/"),
    create: (o) => axios.post("/api/message/", o),
    getOne: (id) => axios.get("/api/message/" + id),
    update: (id, o) => axios.put("/api/message/" + id, o),
    delete: (id) => axios.delete("/api/message/" + id),
  },
  trip: {
    get: () => axios.get("/api/trip/"),
    create: (o) => axios.post("/api/trip/", o),
    getOne: (id) => axios.get("/api/trip/" + id),
    update: (id, o) => axios.put("/api/trip/" + id, o),
    delete: (id) => axios.delete("/api/trip/" + id),
  },
  user: {
    get: () => axios.get("/api/user/"),
    create: (o) => axios.post("/api/user/", o),
    getOne: (id) => axios.get("/api/user/" + id),
    update: (id, o) => axios.put("/api/user/" + id, o),
    delete: (id) => axios.delete("/api/user/" + id),
    login: (o) => axios.post("/api/login", o),
    logout: () => axios.get("/api/logout"),
    signup: (o) => axios.post("/api/signup", o),
    isAuthenticated: () => axios.get("/api/authenticated"),
  },
};

export default api;
