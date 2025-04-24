import { PrismaClient } from "@prisma/client";
import { createGeminiChain } from "../../utils/langchainClient";

const prisma = new PrismaClient();
const chain = createGeminiChain();

const AiServices = {
  chat: async (message: string) => {
    const keywords = message.toLowerCase().split(/\s+/);

    const products = await prisma.products.findMany({
      where: {
        OR: keywords.map((kw) => ({
          productName: { contains: kw },
        })),
      },
      take: 5,
    });

    let input = "";

    if (products.length > 0) {
      const productContext = products
        .map(
          (p, i) =>
            `${i + 1}. ${p.productName}: ${p.productDes} (Giá: ${p.price}đ)`
        )
        .join("\n");

      input = `Dưới đây là danh sách sản phẩm trong cửa hàng:\n${productContext}\n\nCâu hỏi của người dùng: "${message}"`;
    } else {
      input = `Câu hỏi của người dùng: "${message}". Hãy trả lời như một trợ lý thương mại điện tử chuyên nghiệp.`;
    }

    const reply = await chain.invoke({ input });

    return { reply };
  },
};

export default AiServices;
