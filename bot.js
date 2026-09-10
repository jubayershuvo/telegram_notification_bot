
import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is not configured");
}

const bot = new TelegramBot(token, {
  polling: true,
});

// ============================================================
// /start
// ============================================================

bot.onText(/^\/start$/, async (msg) => {
  const chatId = msg.chat.id;

  console.log("User started bot:", {
    chatId,
    username: msg.from?.username,
    firstName: msg.from?.first_name,
  });

  try {
    await bot.sendMessage(
      chatId,
      `👋 Welcome!\n\nYour Chat ID is:\n${chatId}`
    );
  } catch (error) {
    console.error("Telegram reply error:", error);
  }
});

// ============================================================
// ALL MESSAGES
// ============================================================

bot.on("message", (msg) => {
  if (msg.text === "/start") {
    return;
  }

  console.log("Message received:", {
    chatId: msg.chat.id,
    text: msg.text,
  });
});

// ============================================================
// POLLING ERRORS
// ============================================================

bot.on("polling_error", (error) => {
  console.error(
    "Telegram polling error:",
    error.message
  );
});

console.log("Telegram bot started...");

export default bot;

