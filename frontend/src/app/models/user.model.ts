export interface IUser {
  name: string;
  email: string;
  phone: string;
  password?: string;
  uid?: string;
  address: {
    block: string;
    apartment: string;
  };
}

export interface IUserResponse {
  user: IUser;
  statusCode: string;
  message: string;
}
