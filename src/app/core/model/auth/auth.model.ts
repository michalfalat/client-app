export interface IAuthLoginUserRequest {
  email: string;
  password: string;
  remember: boolean;
}

export interface IAuthLoginUserResponse {
  token: string;
}

export interface IAuthRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}
