import UnauthorizedException from "../app/exceptions/Unauthored";
import { errorCode } from "../app/exceptions/Root";
import jwt from "jsonwebtoken";
import Prismaclient from "../../prisma";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      customer: any;
    }
  }
}

const Middleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(
      new UnauthorizedException("Token không hợp lệ", errorCode.UNAUTHORIZED)
    );
  }

  try {
    if (!process.env.KEY_JWT) {
      throw new Error("KEY_JWT is not defined");
    }

    const payload = jwt.verify(authHeader, process.env.KEY_JWT) as {
      customerId: number;
    };
    const account = await Prismaclient.customer.findFirst({
      where: {
        accountId: payload.customerId,
        Account: {
          status: "active",
        },
      },
      include: {
        Account: {
          include: {
            AccountType: true,
          },
        },
      },
    });
    if (!account) {
      return next(
        new UnauthorizedException(
          "Tài khoản không tồn tại hoặc đã bị khóa",
          errorCode.UNAUTHORIZED
        )
      );
    }
    const dataCustomer = {
      ...account,
      accountType: account.Account?.AccountType?.accountTypeName,
    };
    req.customer = dataCustomer;
    next();
  } catch (error) {
    console.error("Auth error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new UnauthorizedException("Token đã hết hạn", errorCode.UNAUTHORIZED)
      );
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new UnauthorizedException("Token không hợp lệ", errorCode.UNAUTHORIZED)
      );
    }
    next(new UnauthorizedException("Lỗi xác thực", errorCode.UNAUTHORIZED));
  }
};

export default Middleware;
