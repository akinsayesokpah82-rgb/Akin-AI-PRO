// backend/bot.js
function registerBotListener() {
  console.log("🤖 Akin Express AI bot listener active...");

  // This is just a placeholder for your bot logic
  // You can connect it to your AI model, database, etc.
  setInterval(() => {
    console.log("🕓 Posting gospel message automatically...");
  }, 240000); // every 4 minutes
}

module.exports = { registerBotListener };
