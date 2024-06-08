export interface IUserAuth {
  displayName: string;
  email: string;
  photoUrl: string;
  stsTokenManager: IStsTokenManager;
}

export interface IStsTokenManager {
  accessToken: string;
  expirationTime: number;
  refreshToken: string;
}

export interface IAuthor {
  id: string;
  username: string;
  email: string;
  subscription_status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export interface IUser extends IAuthor {}
