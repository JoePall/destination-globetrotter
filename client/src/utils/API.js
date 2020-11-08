import axios from "axios";

const API = {
  api: {
    Bookmarks: {
      get: "/api/bookmarks/",
      getOne: "/api/bookmarks/:id",
      create: "/api/bookmarks/",
      update: "/api/bookmarks/:id",
      delete: "/api/bookmarks/:id",
    },
    groups: {
      get: "/api/groups/",
      getOne: "/api/groups/:id",
      create: "/api/groups/",
      update: "/api/groups/:id",
      delete: "/api/groups/:id",
    },
    Messages: {
      get: "/api/messages/",
      getOne: "/api/messages/:id",
      create: "/api/messages/",
      update: "/api/messages/:id",
      delete: "/api/messages/:id",
    },
    Trips: {
      get: "/api/trips/",
      getOne: "/api/trips/:id",
      create: "/api/trips/",
      update: "/api/trips/:id",
      delete: "/api/trips/:id",
    },
    User: {
      get: "/api/user/",
      getOne: "/api/user/:id",
      create: "/api/user/",
      update: "/api/user/:id",
      delete: "/api/user/:id",
    },
  },
};

export default API;
