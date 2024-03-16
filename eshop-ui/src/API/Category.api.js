import { domain } from "../constants/MicroService.config";
import { AppConfig } from "../constants/App.config";
import { ApiUrl } from "../constants/Api.url";
import axios from 'axios';

class CategoryApi {

  static defaultUrl = () => {
    const { pageKey } = AppConfig.categoryList;
    const dominPath = domain(pageKey);
    return `${dominPath}/${ApiUrl.CATEGORIES}`;
  }

  // API to list and search categories.
  static getCategories = (id, data) => {
    let url = CategoryApi.defaultUrl();

    if (id) {
      url = `${url}/${id}`
    }

    return axios.get(url, data)
      .then((response) => response.data);
  };

  // API to create or update a category.
  static createOrUpdateCategory = (id, data) => {
    let url = CategoryApi.defaultUrl();

    const request = id
      ? axios.put(`${url}/${id}`, data)
      : axios.post(url, data);

    return request.then((response) => ({
      ...response.data,
      status: id ? 'Updated' : 'Created',
    }));
    
  }
}



export default CategoryApi;
