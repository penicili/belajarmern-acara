import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { sendMail, renderMailHtml } from "../mail/mail";
import { CLIENT_HOST, EMAIL_SMTP_SERVICE_NAME, EMAIL_SMTP_USER } from "../utils/env";

export interface User {
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  profilePicture: string;
  isActive: boolean;
  activationCode: string;
  createdAt?: string;
}

const Schema = mongoose.Schema;
const UserSchema = new Schema<User>(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    username: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: ["admin", "user"],
      default: "user",
    },
    profilePicture: {
      type: Schema.Types.String,
      default: "user.jpg",
    },
    isActive: {
      type: Schema.Types.Boolean,
      default: false,
    },
    activationCode: {
      type: Schema.Types.String,
    },
    // createdAt: {
    //   type: Schema.Types.Date,
    //   default: Date.now,
    // }
  },
  {
    timestamps: true,
  }
);

// buat middleware buat encrypt password
// pre itu buat nyegat data sebelum "save" terus kalo udah baru
// trigger next() buat lanjut ngelanjutin "save"
UserSchema.pre("save", function (next) {
  // ambil semua data dari user
  // dan simpen ke const user
  const user = this;
  user.password = encrypt(user.password);
  next();
});

// setelah berhasil buat user/ save data, kita kirim email konfirmasi ke user pakai smtp
UserSchema.post("save", async function (doc, next) {
  try {
    const user = doc;
    console.log("send email to", user.email);
    const contentMail = await renderMailHtml("registration-success.ejs", {
      username: user.username,
      fullname: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
      activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
    });
    await sendMail({
      from: EMAIL_SMTP_USER,
      to: user.email,
      subject: "Account Activation",
      html: contentMail,
    });
  } catch (error) {
    console.log("error send email", error);
  }
  finally {
    next();
  }
});

// Override method toJSON dari document mongoDB
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
