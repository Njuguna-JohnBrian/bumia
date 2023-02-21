export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: IAvatar;
  role: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
  getJwtToken(): string;
  getResetPasswordToken(): string;
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

export interface ILogin {
  email: string;
  password: string;
}

export interface IPasswordReset {
  password: string;
  confirmPassword: string;
}
