import { Request, Response } from "express";
import * as Yup from "yup";

// import user model
import UserModel from "../models/user.model";

// Type casting buat request body
type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Validation schema pakai Yup
const registerValidateSchema = Yup.object({
  fullName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords not match"),
});

export default {
  async register(req: Request, res: Response) {
    // Destructure request body
    const { fullName, username, email, password, confirmPassword } =
      // Type casting request body
      req.body as unknown as TRegister;
    try {
      // Panggil validate() method dari object Yup
      await registerValidateSchema.validate({
        fullName,
        username,
        email,
        password,
        confirmPassword,
      });
      // Kalau udah valid, langsung simpen ke database pake method create dari model
      // Simpen return dari create ke const result
      const result = await UserModel.create({
        fullName,
        username,
        email,
        password,
      });
      res.status(200).json({
        message: "Registration success",
        data: { result },
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
