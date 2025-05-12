import { Request, Response } from "express";
import * as Yup from "yup";
import { encrypt } from "../utils/encryption";
import { generateToken } from "../utils/jwt";

// import user model
import UserModel from "../models/user.model";
import { IReqUser } from "../middlewares/auth.middleware";

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
  password: Yup.string()
    .required()
    .min(6, "Password must be at least 6 characters")
    // custom validation using .test method, value will be passed automatically from the registerValidateSchema
    .test(
      "at-least-one-uppercase-letter",
      "contain at least one uppercase letter",
      (value) => {
        if (!value) return false;
        // using regex
        const regex = /^(?=.*[A-Z])/;
        return regex.test(value);
      }
    )
    .test("at-least-one-number", "contain at least one number", (value) => {
      if (!value) return false;
      const regex = /^(?=.*\d)/;
      return regex.test(value);
    }),

  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords not match"),
});

export default {
  // method register
  async register(req: Request, res: Response) {
    /**
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/RegisterRequest"}}
     */
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
    /**
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/LoginRequest"}}
     */
    // Destructure request body
    const { identifier, password } = req.body as unknown as TLogin;
    try {
      // ambil data user berdasarkan "identifier" -> username dan email
      const userByIdentifier = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        // cuma user yang aktif yang bisa login
        isActive: true,
      });
      // kalo user tidak terdaftar
      if (!userByIdentifier) {
        return res.status(403).json({
          message: "User not found or not active",
          data: null,
        });
      }
      // validasi password
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier.password;
      if (!validatePassword) {
        return res.status(403).json({
          message: "Invalid password",
          data: null,
        });
      }
      // generate token pake user id dan role
      const token = generateToken({
        id: userByIdentifier._id,
        role: userByIdentifier.role,
      });

      return res.status(200).json({
        message: "Login success",
        data: token,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  // method me
  async me(req: IReqUser, res: Response) {
    /**
      #swagger.tags = ['Auth']
      #swagger.security =[{
        "bearerAuth":[]}]
     */
    try {
      // ambil data user dari request body (in this case, token)
      const user = req.user;
      // dari user id, ambil data user dari database
      const result = await UserModel.findById(user?.id);
      res.status(200).json({
        message: "Get user profile success",
        data: result,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },

  // activation code
  /**
      #swagger.tags = ['Auth']
      #swagger.requestBody = {
        required: true,
        schema: {$ref: "#/components/schemas/ActivationRequest"}}
     */
  async activation(req: Request, res: Response) {
    try {
      // ambil property code dari request body
      const { code } = req.body as { code: string };
      const user = await UserModel.findOneAndUpdate(
        // filter
        { activationCode: code },
        // apply update
        { isActive: true },
        // options: return updated document
        { new: true }
      );
      res.status(200).json({
        message: "User Activation success",
        data: user,
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
