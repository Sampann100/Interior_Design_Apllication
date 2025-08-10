const axios = require("axios");

exports.chatbot = async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await axios.post(
      "https://api.edenai.run/v2/text/generation",
      {
        providers: ["openai"],
        text: `You are an expert interior design assistant. Answer only with helpful and relevant interior design advice. User: ${userMessage}`,
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EDENAI_AI_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply =
      response.data?.openai?.generated_text ||
      "I couldn't generate a response.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error(
      "Error fetching chatbot response:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch chatbot response" });
  }
};
