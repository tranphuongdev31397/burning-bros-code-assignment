import { Params, Product, ResponseList } from "../models";
import axiosClient from "./axiosClient";

const ROUTE = "/products";
export const productAPI = {
  async getList(params: Params): Promise<ResponseList<Product>> {
    const url = `${ROUTE}`;
    const urlSearch = url + "/search";
    return await axiosClient.get(params?.q ? urlSearch : url, { params });
  },
};
