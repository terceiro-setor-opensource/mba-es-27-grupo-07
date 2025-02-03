export interface IAds {
  title: string;
  description: string;
  price: number;
  status: string;
  filePath: string;
  fileUrl?: string;
  id?: string;
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
