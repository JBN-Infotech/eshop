import { domain } from "../constants/MicroService.config";
import { AppConfig } from "../constants/App.config";
import { ApiUrl } from "../constants/Api.url";
import axios from 'axios';

class ProductApi {

  static defaultUrl = () => {
    const { pageKey } = AppConfig.productList;
    const dominPath = domain(pageKey);
    return `${dominPath}/${ApiUrl.PRODUCTS}`;
  }

  // API to list and search categories.
  static getProducts = (id, data) => {
    let url = ProductApi.defaultUrl();

    if (id) {
      url = `${url}/${id}`
    }

    return axios.get(url, data)
      .then((response) => response.data);
  };

  // API to create or update a category.
  static createOrUpdateProduct = (id, data) => {
    let url = ProductApi.defaultUrl();

    const request = id
      ? axios.put(`${url}/${id}`, data)
      : axios.post(url, data);

    return request.then((response) => ({
      ...response.data,
      status: id ? 'Updated' : 'Created',
    }));
    
  }
}



export default ProductApi;
