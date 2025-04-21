import { PrismaClient } from "@prisma/client";

const AiServices = {
  chat: async (message: string) => {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDwVMHYzLDMmSAnGV_2KhGdilPxWd4Szpw",
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
                  text: message,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data;
  },
};

export default AiServices;
