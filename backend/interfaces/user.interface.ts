export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: IAvatar;
  role: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}

interface IAvatar {
  public_id: string;
  url: string;
}

export interface AuthInput {
  name: string;
  email: string;
  password: string;
  avatar: IAvatar;
  role?: string;
}
