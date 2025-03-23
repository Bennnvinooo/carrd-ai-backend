const { Configuration, OpenAIApi } = require('openai');

export default async function handler(req, res) {
  const { platform, topic } = req.body;

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: `Write a viral ${platform} post about ${topic}` }],
  });

  const content = response.data.choices[0].message.content;
  res.status(200).json({ result: content });
}
