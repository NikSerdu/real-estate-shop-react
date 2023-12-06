import { IRealEstate } from "./realEstate.interface";

export interface IHouse extends IRealEstate {
  hasGarage: boolean;
  hasGarden: boolean;
  gardenArea: number;
}

export interface IHouseCreate extends Omit<IHouse, "id"> {
  userId: string;
}
