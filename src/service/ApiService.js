import queryString from "query-string";
import axios from "axios";
import _ from "lodash";

axios.defaults.baseURL = "http://localhost:3001";

function parse(path, params) {
  _.forEach(
    params,
    (value, key) => (path = _.replace(path, "{" + key + "}", value))
  );

  let queryParams = {};

  _.forEach(params, (value, key) => {
    if (key[0] === "@") {
      const queryParamKey = _.replace(key, "@", "");
      queryParams[queryParamKey] = value;
    }
  });

  if (!_.isEmpty(queryParams)) {
    path += "?" + queryString.stringify(queryParams);
  }

  return path;
}

export default class ApiService {
  static find(path, params = {}) {
    return axios.get(parse(path, params)).then((response) => response.data);
  }

  static insert(path, data) {
    return axios.post(path, data).then((response) => response.data);
  }

  static patch(path, params = {}, data = {}) {
    return axios
      .patch(parse(path, params), data)
      .then((response) => response.data);
  }

  static remove(path, params = {}) {
    return axios.delete(parse(path, params));
  }
}
