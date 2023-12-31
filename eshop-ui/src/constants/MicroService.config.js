import { Domains } from "./Domain.config";
import { AppConfig } from "./App.config";

const MicroServiceConfig = [
  {
    domain: Domains.domain0, // localhost:3000
    pages: [
      AppConfig.categoryList.pageKey,
      AppConfig.categoryForm.pageKey,
      AppConfig.categoryShow.pageKey,
    ]
  },
  {
    domain: Domains.domain1,
  },
  {
    domain: Domains.domain2, // localhost:3002
    pages: [
      'users',
      'userList', 'userList',
    ]
  },
  {
    domain: Domains.domain3,
    pages: [
      AppConfig.productList.pageKey,
      AppConfig.productForm.pageKey,
      AppConfig.productShow.pageKey,
      
    ]
  },
];

export const domain = (page) => {
  const config = MicroServiceConfig.find((item) => item.pages?.includes(page));
  return config.domain || Domains.domain0;
}
