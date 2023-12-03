import { instance } from "../api/api.interceptor";
import { IHouse, IHouseCreate } from "../types/house.interface";
import { IResponse } from "../types/response.interface";

export const HouseService = {
  async getById(id: number) {
    const house = await instance<IHouse>({
      url: `houses/${id}`,
      method: "GET",
    });

    return house;
  },
  async getPrice(id: number) {
    const price = await instance<number>({
      url: `houses/price/${id}`,
      method: "GET",
    });

    return price;
  },
  async create(data: IHouseCreate) {
    const response = await instance<IResponse>({
      url: `houses`,
      method: "POST",
      data,
    });
    return response;
  },
  async delete(id: number) {
    const response = await instance<IResponse>({
      url: `houses/${id}`,
      method: "DELETE",
    });
    return response;
  },
};
