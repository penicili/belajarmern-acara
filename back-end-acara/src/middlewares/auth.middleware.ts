import { NextFunction, Request, Response } from "express";
import { getUserData, IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default (req: Request, res: Response, next: NextFunction) => {
  // ambil authorization header dari request kalo ada
  const authorization = req.headers?.authorization;
  //   klau gada authorization header, return 4031
  if (!authorization) {
    return res.status(403).json({
      message: "Unauthorized access",
      data: null,
    });
  }
  //   split auth header jadi prefix dan token
  const [prefix, token] = authorization.split(" ");
  //   pastiin auth header beneran Bearer token
  if (!(prefix === "Bearer" && token)) {
    return res.status(403).json({
      message: "Unauthorized access",
      data: null,
    });
  }
  //   Decrypt token jadi user data
  const user = getUserData(token);
  //   kalo user data gada return 403
  if (!user) {
    return res.status(403).json({
      message: "Unauthorized access",
      data: null,
    });
  }
  // type cast req jadi sisinya data user yang dimasukin dari token
  // terus set value nya jadi user (data dari token yang udah di decrypt)
  (req as IReqUser).user = user;
  // lanjut ke middleware selajutnya/ controller
  next()
};
