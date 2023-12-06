import { IImage } from "./image.interface";

export interface IRealEstate {
  id: number;
  type: "house" | "flat";
  title: string;
  price: string;
  area: string;
  rooms: number;
  description: string;
  address: string;
  images: IImage[];
  createdAt: number;
  numberOfPhone: string;
}

export interface IRealEstateWithPagination {
  allRealEstates: IRealEstate[];
  totalCount: number;
}
