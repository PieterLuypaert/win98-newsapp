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

// Fallback responses when API is unavailable
const getSimulatedResponse = (input) => {
  const lowerInput = input.toLowerCase();

  const responses = [
    {
      keywords: ["hallo", "hi", "hey", "hoi"],
      text: "It looks like you're saying hello! Would you like help writing a letter?",
    },
    {
      keywords: ["nieuws", "news", "artikel"],
      text: "I see you're interested in the news. Have you tried clicking on a headline?",
    },
    {
      keywords: ["weer", "weather", "regen"],
      text: "It looks like you're asking about the weather. Don't forget your umbrella!",
    },
    {
      keywords: ["win98", "windows", "oud"],
      text: "Windows 98 was the best operating system ever made! Don't you agree?",
    },
    {
      keywords: ["help", "zoek", "waar"],
      text: "It looks like you're lost. Have you tried using the Start menu?",
    },
    {
      keywords: ["error", "stuk", "kapot"],
      text: "An error has occurred? Have you tried turning it off and on again?",
    },
  ];

  const match = responses.find((r) =>
    r.keywords.some((k) => lowerInput.includes(k)),
  );

  if (match) return match.text;

  const defaults = [
    "I'm not sure what you mean, but I'm happy to be here!",
    "It looks like you're typing something complex. Would you like some assistance?",
    "I'm currently in 'Offline Mode' because the server couldn't be reached.",
    "That sounds interesting! Tell me more (or check your internet connection).",
    "I believe I can help with that... wait, let me check my paperclip database.",
  ];

  return defaults[Math.floor(Math.random() * defaults.length)];
};

export const sendMessageToAI = async (userMessage, chatHistory = []) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  // 1. If logic prevents API call (e.g. clearly no internet), fallback immediately
  if (!navigator.onLine) {
    return getSimulatedResponse(userMessage);
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
    // 2. Try the Real AI
    const response = await OpenRouterAPI.post("/chat/completions", {
      model: "google/gemini-2.0-flash-lite-preview-02-05:free", // Free tier model
      messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    // 3. Graceful Fallback on ANY error
    console.warn(
      "⚠️ AI Service unavailable, switching to simulated Clippy:",
      error.message,
    );

    // Log detailed error for developer but don't crash app
    if (error.response) {
      console.error("API Error Details:", error.response.data);
    }

    // Return fake response instead of throwing
    return getSimulatedResponse(userMessage);
  }
};

export default OpenRouterAPI;
