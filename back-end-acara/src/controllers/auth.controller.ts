import { Request, Response } from "express";
import * as Yup from "yup";
import { encrypt } from "../utils/encryption";

// import user model
import UserModel from "../models/user.model";

// Type casting buat request body register
type TRegister = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// type casting buat request body login
type TLogin = {
  identifier: string;
  password: string;
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
  // method register
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

  // method login
  async login(req: Request, res: Response) {
    // Destructure request body
    const { identifier, password } = req.body as unknown as TLogin;
    try {
      // ambil data user berdasarkan "identifier" -> username dan email
      const userByIdentifier = await UserModel.findOne({
        $or: [
          { email: identifier },
          { username: identifier },
        ],
      });
      // kalo user tidak terdaftar
      if (!userByIdentifier){
        return res.status(403).json({
          message: "User not founde",
          data: null,
        })
      }
      // validasi password
      const validatePassword: boolean = encrypt(password) === userByIdentifier.password;
      if (!validatePassword){
        return res.status(403).json({
          message: "Invalid password",
          data: null,
        })
      }
      return res.status(200).json({
        message: "Login success",
        data: userByIdentifier
      })
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
