import AiServices from "../../services/AiServices";
import { Response, Request } from "express";
const AiController = async (req: Request, res: Response) => {
  const { message } = req.body;
  const response = await AiServices.chat(message);
  res.status(200).json(response);
};

export { AiController };
