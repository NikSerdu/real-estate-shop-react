import { authInstance, instance } from "../api/api.interceptor";
import { IFlat, IFlatCreate } from "../types/flat.interface";
import { IResponse } from "../types/response.interface";

export const FlatService = {
  async getById(id: number) {
    const flat = await instance<IFlat>({
      url: `flats/${id}`,
      method: "GET",
    });

    return flat;
  },
  async getPrice(id: number) {
    const price = await instance<number>({
      url: `flats/price/${id}`,
      method: "GET",
    });

    return price;
  },
  async create(data: IFlatCreate) {
    const response = await authInstance<IResponse>({
      url: `flats`,
      method: "POST",
      data,
    });
    return response;
  },
  async delete(id: number) {
    const response = await authInstance<IResponse>({
      url: `flats/${id}`,
      method: "DELETE",
    });
    return response;
  },
};
