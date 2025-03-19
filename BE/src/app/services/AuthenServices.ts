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
const sendOtp = async (phone: string) => {
  console.log(phone);

  if (!phone) throw new Error("Số điện thoại là bắt buộc");

  try {
    let customer = await Prismaclient.customer.findFirst({
      where: { numberPhone: phone },
    });

    if (!customer) {
      const Salt = generateRandomString(16);
      const hashPassword = await bcrypt.hash(
        generateRandomString(8) + Salt,
        10
      );

      const newAccount = await Prismaclient.account.create({
        data: {
          userName: phone,
          password: hashPassword,
          status: "pending",
          Salt: Salt,
          accountTypeId: 3,
        },
      });

      customer = await Prismaclient.customer.create({
        data: {
          accountId: newAccount.accountId,
          customerName: "customer",
          avatar:
            "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1",
          status: "pending",
          numberPhone: phone,
          email: "",
          birthday: new Date(),
          address: "",
          gender: "",
        },
      });
    }

    // Gửi OTP qua Twilio
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID || "")
      .verifications.create({ to: phone, channel: "sms" });

    return {
      success: true,
      status: verification.status,
      message: "OTP đã được gửi thành công",
    };
  } catch (error: any) {
    console.error("Lỗi gửi OTP:", error);
    throw new Error("Lỗi gửi OTP: " + (error.message || "Không xác định"));
  }
};

const verifyOtp = async (phone: string, token: string) => {
  if (!phone || !token) {
    throw new Error("Số điện thoại và mã OTP là bắt buộc");
  }

  try {
    // Xác thực OTP qua Twilio
    const verification_check = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID || "")
      .verificationChecks.create({ to: phone, code: token });

    if (verification_check.status !== "approved") {
      throw new Error("Mã OTP không hợp lệ hoặc đã hết hạn");
    }

    const customer = await Prismaclient.customer.findFirst({
      where: { numberPhone: phone },
      include: { Account: true },
    });

    if (customer) {
      await Prismaclient.account.update({
        where: { accountId: customer.accountId },
        data: { status: "active" },
      });

      await Prismaclient.customer.update({
        where: { customerId: customer.customerId },
        data: { status: "active" },
      });

      const token = jwt.sign(
        {
          id: customer.customerId,
          phone: customer.numberPhone,
          accountId: customer.accountId,
        },
        process.env.JWT_SECRET || "12345",
        { expiresIn: "7d" }
      );

      return {
        success: true,
        message: "OTP xác thực thành công!",
        user: customer,
        token,
      };
    } else {
      throw new Error("Không tìm thấy thông tin người dùng");
    }
  } catch (error: any) {
    console.error("Lỗi xác minh OTP:", error);
    throw new Error("Lỗi xác minh OTP: " + (error.message || "Không xác định"));
  }
};
const loginGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/",
      },
    });

    if (error) throw new Error(error.message);

    return data?.url;
  } catch (error) {
    console.error("Lỗi đăng nhập Google:", error);
    throw error;
  }
};

const signIn = async () => {};

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
