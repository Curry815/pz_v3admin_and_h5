import request from "../utils/request";

export default {
  login(data) {
    return request.post("/login", data);
  },
};
