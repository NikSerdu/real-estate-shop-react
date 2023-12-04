import { IUser } from "../../types/auth.interface";

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
}
