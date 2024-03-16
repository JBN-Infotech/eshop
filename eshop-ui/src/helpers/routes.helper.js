import { AppConfig } from "../constants/App.config";

export const pagePath = (pageKey) => AppConfig[pageKey].url;
