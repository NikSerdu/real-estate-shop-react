import { IRealEstate } from "./realEstate.interface";

export interface IFlat extends IRealEstate {
  hasBalcony: boolean;
  floor: number;
}

export interface IFlatCreate extends Omit<IFlat, "id"> {
  userId: number;
}
