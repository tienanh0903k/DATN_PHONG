import UnauthorizedException from "../app/exceptions/Unauthored";
import { errorCode } from "../app/exceptions/Root";
import jwt from "jsonwebtoken";
import Prismaclient from "../../prisma";
import { Request, Response, NextFunction } from "express";

const Middleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(
      new UnauthorizedException("Unauthorized", errorCode.UNAUTHORIZED)
    );
  }
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET) as {
      customerId: number;
    };
    const account = await Prismaclient.customer.findFirst({
      where: {
        accountId: payload.customerId,
      },
      include: {
        Account: true,
      },
    });

    if (!account) {
      return next(
        new UnauthorizedException("Unauthorized", errorCode.UNAUTHORIZED)
      );
    }
    res.json(account);
    next();
  } catch (error) {
    next(new UnauthorizedException("Unauthorized", errorCode.UNAUTHORIZED));
  }
};

export default Middleware;
