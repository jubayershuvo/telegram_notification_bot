
import "dotenv/config";
import express from "express";
import bot from "./bot.js";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Telegram bot server is running",
  });
});

// ============================================================
// SEND MESSAGE
// ============================================================

app.post("/send-message", async (req, res) => {
  try {
    const { chat_id, message } = req.body;

    if (!chat_id) {
      return res.status(400).json({
        success: false,
        message: "chat_id is required",
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "message is required",
      });
    }

    const sentMessage = await bot.sendMessage(
      chat_id,
      message
    );

    return res.status(200).json({
      success: true,
      message: "Telegram message sent successfully",
      telegram_message_id: sentMessage.message_id,
    });
  } catch (error) {
    console.error("Telegram send error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send Telegram message",
      error: error.message,
    });
  }
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(
    `Express server running on port ${PORT}`
  );
});

