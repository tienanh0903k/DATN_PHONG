import Prismaclient from "../../../prisma";
import { IAuthen } from "./interfaces/IAuthen";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateRandomString from "../../utils";
import { supabase, twilioClient } from "../../config/supabase";
const SignUp = async (dataProps: IAuthen) => {
  const existingAccount = await Prismaclient.account.findFirst({
    where: { userName: dataProps.userName },
  });
  if (!existingAccount) {
    const Salt = generateRandomString(16);
    const hashPassword = await bcrypt.hash(dataProps.password + Salt, 10);

    return await Prismaclient.customer.create({
      data: {
        customerName: dataProps.customerName,
        avatar:
          "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
        birthday: new Date("1990-01-01"),
        email: "",
        address: "",
        gender: "",
        status: "active",
        numberPhone: dataProps.numberPhone,
        Account: {
          create: {
            userName: dataProps.userName,
            password: hashPassword,
            accountTypeId: 3,
            status: "active",
            Salt: Salt,
          },
        },
      },
    });
  }
};
const sendOtp = async (Email: string) => {
  try {
    let customer = await Prismaclient.customer.findFirst({
      where: { email: Email },
    });

    if (!customer) {
      await supabase.auth.signInWithOtp({
        email: Email,
      });
    } else {
      return {
        success: false,
        status: "error",
        message: "Email đã tồn tại",
      };
    }
  } catch (error: any) {
    console.error("Lỗi gửi OTP:", error);
    throw new Error("Lỗi gửi OTP: " + (error.message || "Không xác định"));
  }
};

const verifyOtp = async (Email: string, otp: string) => {
  try {
    const response = await supabase.auth.verifyOtp({
      email: Email,
      token: otp,
      type: "email",
    });
    return response;
  } catch (error: any) {
    console.error("Lỗi xác minh OTP:", error);
    return {
      success: false,
      status: "error",
      message: "Lỗi xác minh OTP",
    };
  }
};
const loginGoogle = async (href: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000${href}`,
      },
    });

    if (error) throw new Error(error.message);

    return data?.url;
  } catch (error) {
    console.error("Lỗi đăng nhập Google:", error);
    throw error;
  }
};

const signIn = async (email: string) => {
  try {
    const customer = await Prismaclient.customer.findFirst({
      where: {
        email: email,
      },
    });

    return customer;
  } catch (error) {
    throw new Error("Lỗi đăng nhập: " + error);
  }
};

const handleGoogleCallback = async (access_token: string) => {
  if (!access_token) {
    throw new Error("Không có access token.");
  }

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token);

    if (error) {
      throw new Error("Lỗi khi lấy thông tin user: " + error.message);
    }

    const existingCustomer = await Prismaclient.customer.findFirst({
      where: {
        email: user?.email,
      },
    });

    if (!existingCustomer) {
      const newAccount = await Prismaclient.account.create({
        data: {
          userName: user?.email || "",
          password: "",
          status: "active",
          Salt: generateRandomString(16),
          accountTypeId: 3,
        },
      });
      await Prismaclient.customer.create({
        data: {
          accountId: newAccount.accountId,
          email: user?.email || "",
          customerName: user?.user_metadata?.full_name || "",
          avatar: user?.user_metadata?.avatar_url || "",
          status: "active",
          numberPhone: "",
          birthday: new Date(),
          address: "",
          gender: "",
        },
      });
    }
    return {
      user,
      access_token,
    };
  } catch (error) {
    throw new Error("Lỗi xử lý callback: " + error);
  }
};

export {
  SignUp,
  signIn,
  sendOtp,
  verifyOtp,
  loginGoogle,
  handleGoogleCallback,
};
