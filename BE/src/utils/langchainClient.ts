import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import { BufferMemory } from "langchain/memory";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ConversationChain } from "langchain/chains";
import { StringOutputParser } from "@langchain/core/output_parsers";
export const createGeminiChain = () => {
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-1.5-flash",
  });
  const memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "history",
  });
  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "Bạn là trợ lý thương mại điện tử. Trả lời ngắn gọn, chính xác và hữu ích.",
    ],
    ["placeholder", "{history}"],
    ["human", "{input}"],
  ]);

  const chain = new ConversationChain({
    memory,
    prompt,
    llm: model,
    outputParser: new StringOutputParser(),
  });

  return chain;
};
