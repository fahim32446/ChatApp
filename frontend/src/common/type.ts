export interface HTTPResponse<T> {
  message?: string;
  data: T;
  success?: boolean;
}

export interface loginResponse {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
  token: string;
}

export interface usersType {
  _id: string;
  fullName: string;
  username: string;
  gender: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export interface GetMessages {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  shouldShake?: string;
  __v: string;
}
