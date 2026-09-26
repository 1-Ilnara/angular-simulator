export interface IAuthResponse extends IUser {
  accessToken: string;
  refreshToken: string;
}