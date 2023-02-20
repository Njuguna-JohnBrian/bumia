import { Response } from "express";
import { IUser } from "../interfaces/user.interface";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendJwtToken = (user: IUser | any, statusCode: number, res: Response) => {
  const token = user.getJwtToken();

  console.log(token);

  /**
   * cookie options
   */
  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES_TIME) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export { sendJwtToken };
