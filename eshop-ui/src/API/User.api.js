import { domain } from "../constants/MicroService.config";
import { AppConfig } from "../constants/App.config";
import { ApiUrl } from "../constants/Api.url";
import axios from 'axios';

class UserApi {

  static defaultUrl = () => {
    const { pageKey } = AppConfig.userList;
    const dominPath = domain(pageKey);
    return `${dominPath}/${ApiUrl.USERS}`;
  }

  // API to list and search users.
  static getUsers = (id, data) => {
    let url = UserApi.defaultUrl();

    if (id) {
      url = `${url}/${id}`
    }

    return axios.get(url, data)
      .then((response) => response.data);
  };

  // API to create or update a category.
  static createOrUpdateUser = (id, data) => {
    let url = UserApi.defaultUrl();

    const request = id
      ? axios.put(`${url}/${id}`, data)
      : axios.post(url, data);

    return request.then((response) => ({
      ...response.data,
      status: id ? 'Updated' : 'Created',
    }));
  }

  static loginUser = ({ username, password }) => {
    console.log('loginUser= ',username, password)
    let url = UserApi.defaultUrl();
    return axios.post(`${url}/${ApiUrl.LOGIN}/`, { username, password })
      .then((response) => response.data);
  }
}



export default UserApi;
