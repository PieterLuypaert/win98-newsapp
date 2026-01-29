import axios from "axios";

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

const OpenRouterAPI = axios.create({
  baseURL: OPENROUTER_BASE,
  headers: {
    "Content-Type": "application/json",
    "HTTP-Referer": window.location.origin, // Required by OpenRouter for rankings
    "X-Title": "Windows 98 News App", // Optional, shows in OpenRouter dashboard
  },
});

// Add API key to requests
OpenRouterAPI.interceptors.request.use((config) => {
  // Sanitize the key: remove quotes and whitespace
  const rawKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = rawKey ? rawKey.replace(/"/g, "").trim() : null;

  if (!apiKey) {
    console.warn(
      "⚠️ OpenRouter API Key is missing! Check your VITE_OPENROUTER_API_KEY environment variable.",
    );
  } else {
    config.headers.Authorization = `Bearer ${apiKey}`;
  }

  return config;
});

export const sendMessageToAI = async (userMessage, chatHistory = []) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

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
      model: "google/gemini-2.0-flash-lite-preview-02-05:free",
      messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("❌ Full OpenRouter Error Object:", error);

    if (error.response) {
      console.error("❌ Error Data:", error.response.data);
      console.error("❌ Error Status:", error.response.status);
      console.error("❌ Error Headers:", error.response.headers);

      throw new Error(
        error.response.data?.error?.message ||
          `API error: ${error.response.status}`,
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
