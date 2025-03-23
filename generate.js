import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST requests allowed" });
    }

    const { platform, topic } = req.body;

    if (!platform || !topic) {
      return res.status(400).json({ message: "Missing platform or topic" });
    }

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Write a viral post for ${platform} about ${topic}.`,
        },
      ],
    });

    const result = response.data.choices[0].message.content;
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Serverless function error:", error);
    return res.status(500).json({
      message: "Serverless function crashed",
      error: error.message,
    });
  }
}
