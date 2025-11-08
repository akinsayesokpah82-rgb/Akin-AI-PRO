import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initFirebaseAdmin } from './firebaseAdmin.js';
import { registerBotListener, startGospelNotifier } from './bot.js';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Initialize Firebase admin if provided.
try {
  initFirebaseAdmin();
  console.log('✅ Firebase Admin initialized');
} catch (err) {
  console.warn('⚠️ Firebase Admin init skipped:', err.message);
}

// Start bot and notifier if firebase present
try {
  registerBotListener();
  startGospelNotifier();
} catch (err) {
  console.warn('⚠️ Bot services not started:', err.message);
}

app.get('/api/health', (req,res)=> res.json({status:'ok'}));

// AI chat endpoint: uses OPENAI_API_KEY env var. Fallback when missing.
app.post('/api/chat', async (req,res)=>{
  try{
    const { message } = req.body;
    if(!message) return res.status(400).json({ error: 'message required' });
    const ownerTrigger = ['who created','who made','who is the owner','who founded'];
    const textLower = message.toLowerCase();
    if(ownerTrigger.some(t => textLower.includes(t))) {
      return res.json({ reply: "I was created by Akin S. Sokpah — Akin AI -LIB. Liberian, attending Smythe University College." });
    }
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if(!OPENAI_KEY) {
      return res.json({ reply: `AkinExpressAI (offline): received: "${message}". Set OPENAI_API_KEY to enable advanced replies.` });
    }
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are AkinExpressAI, a helpful assistant for university students.' }, { role:'user', content: message }],
      max_tokens: 400
    };
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
      body: JSON.stringify(body)
    });
    if(!r.ok) {
      const txt = await r.text();
      console.error('OpenAI error', r.status, txt);
      return res.status(502).json({ error:'OpenAI error', detail: txt });
    }
    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || 'No reply';
    return res.json({ reply });
  }catch(err){
    console.error('Chat error', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('*', (req,res) => {
  res.sendFile(path.join(publicDir,'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log(`🧠 Akin Express AI backend running on port ${PORT}`));
