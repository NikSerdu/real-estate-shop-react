import { instance } from "../api/api.interceptor";
import { IRealEstate } from "../types/realEstate.interface";

export const RealEstateService = {
  async getAll() {
    const data = await instance<IRealEstate[]>({
      url: "real-estate",
      method: "GET",
    });
    return data;
  },
  async getByUserId(id: number) {
    const data = await instance<IRealEstate[]>({
      url: `real-estate/${id}`,
      method: "GET",
    });
    return data;
  },
};
