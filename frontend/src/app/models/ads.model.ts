import { IUser } from './user.model';

export interface IAds {
  title: string;
  description: string;
  price: number;
  status: string;
  filePath: string;
  fileUrl?: string;
  id?: string;
  createAt?: Date;
  updateAt?: Date;
}

export interface IAdsListResponse {
  adsList?: IAds[];
  message: string;
  statusCode: string;
}

export interface IAdsResponse {
  ads?: IAds;
  message: string;
  statusCode: string;
}

export interface IAdsDetailsResponse {
  data?: {
    ads: IAds;
    user: IUser;
  };
  message: string;
  statusCode: string;
}
