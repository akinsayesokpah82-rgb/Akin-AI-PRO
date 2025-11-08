import { initFirebaseAdmin } from './firebaseAdmin.js';
let admin;
try {
  admin = initFirebaseAdmin();
} catch (err) {
  console.warn('Bot: firebase admin not initialized:', err.message);
  export function registerBotListener(){}
  export function startGospelNotifier(){}
  return;
}

const db = admin.database();
const PATH = 'groups/university_students/messages';
const BOT_NAME = 'Akin Express AI';
const BOT_UID = 'bot_akinexpressai';

export function registerBotListener() {
  const ref = db.ref(PATH);
  ref.on('child_added', async (snap) => {
    const msg = snap.val();
    if(!msg || !msg.text) return;
    if(msg.uid === BOT_UID || msg.sender === BOT_NAME) return;
    const txt = (msg.text||'').toLowerCase();
    if(txt.includes('@akinexpressai') || txt.includes('akinexpressai')) {
      let reply = 'Hi! I am Akin Express AI. How can I help?';
      if(txt.includes('who created')||txt.includes('who made')) {
        reply = 'Akin S. Sokpah is the owner/founder of Akin Express AI — Liberian, Smythe University College.';
      } else {
        const key = process.env.OPENAI_API_KEY;
        if(key) {
          try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
              method:'POST',
              headers:{ 'Content-Type':'application/json', 'Authorization': `Bearer ${key}` },
              body: JSON.stringify({ model:'gpt-3.5-turbo', messages:[{role:'system',content:'You are AkinExpressAI assistant.'},{role:'user',content: msg.text}], max_tokens:250 })
            });
            if(res.ok) {
              const d = await res.json();
              reply = d.choices?.[0]?.message?.content || reply;
            }
          } catch(e) {
            console.error('OpenAI error in bot', e.message);
          }
        }
      }
      await db.ref(PATH).push({ uid: BOT_UID, sender: BOT_NAME, text: reply, timestamp: Date.now() });
    }
  });
  console.log('Bot listener active on', PATH);
}

export function startGospelNotifier() {
  setInterval(async ()=> {
    try {
      await db.ref(PATH).push({ uid: BOT_UID, sender: BOT_NAME, text: 'Gospel update: Jesus Christ loves you. — Akin AI -LIB', timestamp: Date.now() });
      console.log('Gospel posted');
    } catch(e) { console.error('Gospel post failed', e.message); }
  }, 4*60*1000);
}
