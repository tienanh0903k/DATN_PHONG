import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const AiServices = {
  chat: async (message: string) => {
    const keywords = message.toLowerCase().split(" ");
    console.log(keywords);
    const products = await prisma.products.findMany({
      where: {
        OR: keywords.map((kw) => ({
          productName: { contains: kw },
        })),
      },
      take: 5,
    });
    if (products.length === 0) {
      return { reply: "Không tìm thấy sản phẩm phù hợp với yêu cầu của bạn." };
    }

    const productContext = products
      .map(
        (p, i) =>
          `${i + 1}. ${p.productName}: ${p.productDes} (Giá: ${p.price}đ)`
      )
      .join("\n");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Bạn là một trợ lý tư vấn thương mại điện tử. Dưới đây là danh sách sản phẩm liên quan:\n${productContext}\n\nYêu cầu từ người dùng: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Không có phản hồi từ AI.";
    return { reply };
  },
};

export default AiServices;
