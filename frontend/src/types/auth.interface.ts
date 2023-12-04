export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  userId: string;
  userRoles: string[];
  userName: string;
  userEmail: string;
}

export interface IUserWithTokens extends IUser {
  accessToken: string;
  refreshToken: string;
}
