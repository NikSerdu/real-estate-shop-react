import { authInstance, instance } from "../api/api.interceptor";
import {
  IRealEstate,
  IRealEstateWithPagination,
} from "../types/realEstate.interface";

export const RealEstateService = {
  async getAll(page: number, search: string) {
    const data = await instance<IRealEstateWithPagination>({
      url: "real-estate",
      method: "GET",
      params: {
        pageNumber: page,
        pageSize: 10,
        search: search,
      },
    });
    return data;
  },
  async getByUserId(id: string) {
    const data = await authInstance<IRealEstate[]>({
      url: `real-estate/${id}`,
      method: "GET",
    });
    return data;
  },
};
