import axios from "axios";

const api = {
  bookmark: {
    get: () => axios.get("/api/bookmark/"),
    create: (o) => axios.post("/api/bookmark/", o),
    getOne: (id) => axios.get("/api/bookmark/" + id),
    update: (id, o) => axios.put("/api/bookmark/" + id, o),
    delete: (id) => axios.delete("/api/bookmark/" + id),
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
    createFromFlight: (o) => axios.post("/api/createfromflight", o),
  },
  trip_bookmark: {
    create: (o) => axios.post("/api/trip_bookmark/", o),
    delete: (id) => axios.delete("/api/trip_bookmark/" + id),
  },
  trip_user: {
    create: (o) => axios.post("/api/trip_user/", o),
    delete: (id) => axios.delete("/api/trip_user/" + id),
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
  friends: {
    get: () => axios.get("/api/friends/"),
    create: (o) => axios.post("/api/friends/", o),
    getOne: (id) => axios.get("/api/friends/" + id),
    delete: (id) => axios.delete("/api/friends/" + id),
  },
  pending: {
    get: () => axios.get("/api/pending/"),
    create: (o) => axios.post("/api/pending/", o),
    getOne: (id) => axios.get("/api/pending/" + id),
    delete: (id) => axios.delete("/api/pending/" + id),
  },
  tripsbyuser: (id) => axios.get("/api/tripsbyuser/" + id),
  usersbytrip: (id) => axios.get("/api/usersbytrip/" + id),
  createfromflight: (o) => axios.post("/api/createfromflight/", o),
  pendingtrips: (id) => axios.get("/api/pendingtrips/" + id),
};

export default api;
