import axios from "axios";

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

const OpenRouterAPI = axios.create({
  baseURL: OPENROUTER_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add API key to requests
OpenRouterAPI.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }
  return config;
});

export const sendMessageToAI = async (userMessage, chatHistory = []) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey || apiKey === "your_openrouter_api_key_here") {
    throw new Error("OpenRouter API key not configured");
  }

  const messages = [
    {
      role: "system",
      content:
        "You are Clippy, the helpful Windows 98 assistant. You are helping users navigate a news application. Be friendly, concise, and helpful. Keep responses short and to the point.",
    },
    ...chatHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    {
      role: "user",
      content: userMessage,
    },
  ];

  try {
    const response = await OpenRouterAPI.post("/chat/completions", {
      model: "openai/gpt-3.5-turbo",
      messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API error:", error);
    
    if (error.response) {
      throw new Error(
        error.response.data?.error?.message || 
        `API error: ${error.response.status}`
      );
    } else if (error.request) {
      // Request made but no response
      throw new Error("No response from AI service");
    } else {
      // Something else went wrong
      throw new Error(error.message || "Failed to connect to AI service");
    }
  }
};

export default OpenRouterAPI;