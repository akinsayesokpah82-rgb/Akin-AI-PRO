import { registerBotListener, startGospelNotifier } from './bot.js';
```)  
but your `bot.js` file is **still written using CommonJS (`module.exports`)** syntax.

---

### 🔧 Fix for ES Module Setup (what you have now)
Since your `package.json` uses `"type": "module"`, you need to update `backend/bot.js` to use **ES module exports**:

Replace the entire contents of your current `backend/bot.js` with this:

```js
// backend/bot.js
export function registerBotListener() {
  console.log("🤖 Akin Express AI bot listener active...");

  // Your bot logic can go here
  setInterval(() => {
    console.log("🕓 Posting gospel message automatically...");
  }, 240000); // every 4 minutes
}

export function startGospelNotifier() {
  console.log("🙏 Gospel notifier running...");
  setInterval(() => {
    console.log("📖 Daily gospel message broadcasted.");
  }, 600000); // every 10 minutes
}
