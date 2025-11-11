import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cron from 'node-cron';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// ========================================
// GLOBAL LIGHT EDUCATIONAL PLATFORM
// Created by: Akin S. Sokpah
// Email: sokpahakinsaye81@gmail.com
// Facebook: Express AI PRO
// ========================================

console.log('🌟 Starting Global Light Educational Platform...');
console.log('📧 Created by: Akin S. Sokpah (sokpahakinsaye81@gmail.com)');

// Motivational Quotes Database
const motivationalQuotes = [
  "Education is the most powerful weapon you can use to change the world. - Nelson Mandela",
  "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
  "Faith is taking the first step even when you don't see the whole staircase. - Martin Luther King Jr.",
  "With God all things are possible. - Matthew 19:26",
  "I can do all things through Christ who strengthens me. - Philippians 4:13",
  "Trust in the Lord with all your heart. - Proverbs 3:5",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Education is not preparation for life; education is life itself. - John Dewey",
  "Your talent is God's gift to you. What you do with it is your gift back to God. - Leo Buscaglia",
  "Believe you can and you're halfway there. - Theodore Roosevelt"
];

let currentQuoteIndex = 0;

// Bible verses database
const bibleVerses = [
  { verse: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { verse: "Psalm 23:1", text: "The Lord is my shepherd, I lack nothing." },
  { verse: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
  { verse: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
  { verse: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand." }
];

// WASSCE/WAEC Subject Topics
const wasscTopics = {
  mathematics: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"],
  english: ["Comprehension", "Essay Writing", "Grammar", "Literature", "Oral English"],
  physics: ["Mechanics", "Electricity", "Waves", "Thermodynamics", "Modern Physics"],
  chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"],
  biology: ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Evolution"],
  economics: ["Microeconomics", "Macroeconomics", "Development Economics", "International Trade"],
  geography: ["Physical Geography", "Human Geography", "Map Reading", "Environmental Studies"],
  history: ["African History", "World History", "Government", "Civics"]
};

// Course catalog
const courses = {
  piano: ["Piano Basics", "Music Theory", "Chord Progressions", "Classical Piano", "Contemporary Piano"],
  guitar: ["Guitar Fundamentals", "Strumming Patterns", "Fingerpicking", "Music Theory for Guitar"],
  drums: ["Drum Basics", "Rhythm Patterns", "Advanced Techniques", "Music Reading for Drummers"],
  vocals: ["Vocal Techniques", "Breath Control", "Pitch Training", "Performance Skills"],
  bible: ["Old Testament Overview", "New Testament Studies", "Gospel of Jesus", "Biblical History", "Christian Living"]
};

// Facebook Marketing Topics
const facebookMarketingTopics = [
  "Setting Up a Professional Facebook Page",
  "Understanding Facebook Algorithm",
  "Content Creation Strategies",
  "Facebook Ads Fundamentals",
  "Audience Targeting and Demographics",
  "Engagement Techniques",
  "Facebook Marketplace Selling",
  "Monetization Strategies",
  "Building a Following",
  "Analytics and Insights"
];

// ========================================
// API ENDPOINTS
// ========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    platform: 'Global Light Educational Platform',
    creator: 'Akin S. Sokpah',
    email: 'sokpahakinsaye81@gmail.com'
  });
});

// Get current motivational quote
app.get('/api/motivation/current', (req, res) => {
  res.json({
    quote: motivationalQuotes[currentQuoteIndex],
    timestamp: new Date().toISOString(),
    nextUpdate: '30 minutes'
  });
});

// Get all motivational quotes
app.get('/api/motivation/all', (req, res) => {
  res.json({ quotes: motivationalQuotes });
});

// Bible verses endpoint
app.get('/api/bible/verses', (req, res) => {
  res.json({ verses: bibleVerses });
});

// Random bible verse
app.get('/api/bible/random', (req, res) => {
  const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
  res.json(randomVerse);
});

// WASSCE/WAEC subjects
app.get('/api/wassce/subjects', (req, res) => {
  res.json({ subjects: Object.keys(wasscTopics) });
});

// WASSCE/WAEC topics by subject
app.get('/api/wassce/topics/:subject', (req, res) => {
  const subject = req.params.subject.toLowerCase();
  if (wasscTopics[subject]) {
    res.json({ subject, topics: wasscTopics[subject] });
  } else {
    res.status(404).json({ error: 'Subject not found' });
  }
});

// Course catalog
app.get('/api/courses', (req, res) => {
  res.json({ courses });
});

// Course details
app.get('/api/courses/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  if (courses[category]) {
    res.json({ category, lessons: courses[category] });
  } else {
    res.status(404).json({ error: 'Course category not found' });
  }
});

// Facebook marketing topics
app.get('/api/facebook-marketing/topics', (req, res) => {
  res.json({ topics: facebookMarketingTopics });
});

// AI Chat Assistant (Multi-purpose)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) return res.status(400).json({ error: 'message required' });

    // Check for creator/owner questions
    const ownerTrigger = ['who created', 'who made', 'who is the owner', 'who founded', 'creator'];
    const textLower = message.toLowerCase();

    if (ownerTrigger.some(t => textLower.includes(t))) {
      return res.json({
        reply: "Global Light was created by Akin S. Sokpah. Email: sokpahakinsaye81@gmail.com. This platform is dedicated to education, faith, and empowering students globally through AI-powered learning.",
        source: 'system'
      });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return res.json({
        reply: `Global Light AI Assistant (offline mode): I received your message: "${message}". To enable full AI features, please configure OPENAI_API_KEY in your environment variables.`,
        source: 'fallback'
      });
    }

    // Determine system prompt based on context
    let systemPrompt = 'You are Global Light AI Assistant, created by Akin S. Sokpah. You help students with education, Bible studies, music lessons, and life guidance.';

    if (context === 'wassce') {
      systemPrompt = 'You are a WASSCE/WAEC exam preparation tutor. Help students understand concepts, provide practice questions, and explain answers clearly.';
    } else if (context === 'bible') {
      systemPrompt = 'You are a Bible study assistant. Help users understand scripture, provide spiritual guidance, and share the Gospel of Jesus Christ.';
    } else if (context === 'music') {
      systemPrompt = 'You are a music teacher specializing in piano, instruments, and music theory. Provide clear, step-by-step lessons.';
    } else if (context === 'facebook') {
      systemPrompt = 'You are a Facebook marketing expert. Teach users how to make money on Facebook through content creation, ads, and business strategies.';
    }

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('OpenAI error', r.status, txt);
      return res.status(502).json({ error: 'OpenAI error', detail: txt });
    }

    const data = await r.json();
    const reply = data.choices?.[0]?.message?.content || 'No reply generated';
    return res.json({ reply, source: 'openai', context });

  } catch (err) {
    console.error('Chat error', err);
    res.status(500).json({ error: err.message });
  }
});

// WASSCE/WAEC Chatbot endpoint
app.post('/api/wassce/ask', async (req, res) => {
  try {
    const { subject, topic, question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question required' });
    }

    const contextMessage = subject && topic
      ? `Subject: ${subject}, Topic: ${topic}. Question: ${question}`
      : question;

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return res.json({
        answer: `WASSCE Tutor (offline): Your question about ${subject || 'this topic'} was received. Configure OPENAI_API_KEY for detailed explanations.`,
        subject,
        topic
      });
    }

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert WASSCE/WAEC tutor. Provide clear, detailed explanations. Include examples and practice tips.'
        },
        { role: 'user', content: contextMessage }
      ],
      max_tokens: 600
    };

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await r.json();
    const answer = data.choices?.[0]?.message?.content || 'Unable to generate answer';

    res.json({ answer, subject, topic });

  } catch (err) {
    console.error('WASSCE chatbot error', err);
    res.status(500).json({ error: err.message });
  }
});

// Bible Tournament Endpoint (for future expansion)
app.post('/api/bible/tournament/question', (req, res) => {
  const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
  // Simple quiz: given the verse, identify the reference
  res.json({
    question: `What is the biblical reference for: "${randomVerse.text}"?`,
    answer: randomVerse.verse,
    type: 'verse-identification'
  });
});

// Facebook Page Info
app.get('/api/about/creator', (req, res) => {
  res.json({
    name: 'Akin S. Sokpah',
    email: 'sokpahakinsaye81@gmail.com',
    facebookPage: 'Express AI PRO',
    pageId: '874616512398098',
    platform: 'Global Light Educational Platform',
    mission: 'Empowering students globally through AI-powered education, faith-based learning, and practical skills development.'
  });
});

// ========================================
// SCHEDULED TASKS
// ========================================

// Motivational Quote Bot - Updates every 30 minutes
cron.schedule('*/30 * * * *', () => {
  currentQuoteIndex = (currentQuoteIndex + 1) % motivationalQuotes.length;
  console.log(`✨ [${new Date().toLocaleTimeString()}] New motivational quote: ${motivationalQuotes[currentQuoteIndex]}`);
});

console.log('🤖 Motivational quote bot activated (updates every 30 minutes)');

// Gospel Notifier - Daily at 9 AM
cron.schedule('0 9 * * *', () => {
  const randomVerse = bibleVerses[Math.floor(Math.random() * bibleVerses.length)];
  console.log(`📖 Daily Gospel: ${randomVerse.verse} - ${randomVerse.text}`);
});

// ========================================
// SERVE FRONTEND
// ========================================

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🌟 Global Light Educational Platform`);
  console.log(`📧 Created by: Akin S. Sokpah`);
  console.log(`📮 Email: sokpahakinsaye81@gmail.com`);
  console.log(`🔗 Facebook: Express AI PRO`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`${'='.repeat(50)}\n`);
});
