// index.js - MoneyMaker Telegram bot

// 1) Import library
const TelegramBot = require("node-telegram-bot-api");

// 2) Read token from environment variable (we'll set it later on Render)
const token = process.env.BOT_TOKEN;

if (!token) {
  console.error("❌ BOT_TOKEN environment variable is missing");
  process.exit(1);
}

// 3) Create bot with long polling
const bot = new TelegramBot(token, { polling: true });

// 4) URL of your WebApp (MoneyMaker game)
const WEBAPP_URL = "https://telegram-money-maker.vercel.app/";

// 5) /start command → send WebApp button
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = (msg.from && msg.from.first_name) || "friend";

  bot.sendMessage(
    chatId,
    `Hey ${firstName}! 🎉\n\nTap the button below to open MoneyMaker 💸`,
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Open MoneyMaker 💸",
              web_app: { url: WEBAPP_URL }
            }
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: false
      }
    }
  );
});

// (Optional) log any data the WebApp sends back
bot.on("message", (msg) => {
  if (msg.web_app_data) {
    console.log("Got WebApp data:", msg.web_app_data);
  }
  // we don't reply here, /start already shows the button
});
