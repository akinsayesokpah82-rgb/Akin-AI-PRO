# 🌟 Global Light Educational Platform

**An AI-powered comprehensive learning platform combining education, faith, and practical skills**

Created by **Akin S. Sokpah**
📧 sokpahakinsaye81@gmail.com
📘 Facebook: Express AI PRO (Page ID: 874616512398098)

---

## 🎯 Platform Overview

Global Light is a revolutionary educational platform that combines cutting-edge AI technology with timeless wisdom to create a comprehensive learning experience. The platform serves students globally with a special focus on African education systems (WASSCE/WAEC).

## ✨ Key Features

### 📚 WASSCE/WAEC Exam Preparation
- AI-powered tutoring for all major subjects
- Subject-specific guidance (Mathematics, English, Physics, Chemistry, Biology, Economics, Geography, History)
- Practice questions and detailed explanations
- Personalized learning experience

### 📖 Bible Study & Gospel
- Interactive Bible study assistant
- Random verse generator
- AI-powered spiritual guidance
- Live Bible tournaments with quizzes
- Gospel messages and daily devotionals

### 🎹 AI-Powered Music Courses
- **Piano Lessons**: From basics to advanced techniques
- **Guitar Training**: Complete guitar mastery
- **Drum Lessons**: Rhythm and technique development
- **Vocal Training**: Voice improvement and performance skills
- Step-by-step AI instruction for each instrument

### 💼 Facebook Marketing Mastery
- Learn how to make money on Facebook
- Content creation strategies
- Facebook Ads fundamentals
- Audience targeting techniques
- Monetization strategies
- Business growth tactics

### 💡 Motivational Quote Bot
- Automatic motivational quotes every 30 minutes
- Inspirational messages for students
- Faith-based encouragement
- Educational wisdom

### 🤖 General AI Chat Assistant
- 24/7 AI assistance
- Help with homework and studies
- Life advice and guidance
- General knowledge queries

---

## 🚀 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI GPT-3.5** - AI-powered responses
- **Node-cron** - Scheduled tasks
- **Axios** - HTTP requests

### Frontend
- **Vanilla JavaScript** - Interactive functionality
- **Modern CSS** - Beautiful responsive design
- **Font Awesome** - Icons and visual elements
- **Custom animations** - Smooth user experience

### Deployment
- **Render** - Cloud hosting platform
- **GitHub** - Version control
- **Environment Variables** - Secure API key management

---

## 📁 Project Structure

```
global-light-platform/
├── backend/
│   ├── server.js              # Main Express server
│   ├── package.json           # Dependencies and scripts
│   ├── public/
│   │   ├── index.html        # Main HTML file
│   │   ├── app.js            # Frontend JavaScript
│   │   └── style.css         # Styling
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── DEPLOYMENT_GUIDE.md        # Complete deployment instructions
```

---

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key
- Git installed

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/global-light-platform.git
   cd global-light-platform
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp ../.env.example .env
   # Edit .env and add your OPENAI_API_KEY
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:10000
   ```

For complete deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory with:

```env
PORT=10000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
```

**Important:** Never commit your `.env` file to GitHub! It's already in `.gitignore`.

---

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```

### Motivational Quotes
```
GET /api/motivation/current
GET /api/motivation/all
```

### Bible & Gospel
```
GET /api/bible/verses
GET /api/bible/random
POST /api/bible/tournament/question
```

### WASSCE/WAEC
```
GET /api/wassce/subjects
GET /api/wassce/topics/:subject
POST /api/wassce/ask
```

### Courses
```
GET /api/courses
GET /api/courses/:category
```

### Facebook Marketing
```
GET /api/facebook-marketing/topics
```

### AI Chat
```
POST /api/chat
Body: { "message": "your question", "context": "optional context" }
```

### Creator Info
```
GET /api/about/creator
```

---

## 🎨 Features in Detail

### Multi-Context AI Assistant
The AI assistant adapts based on context:
- **WASSCE Context**: Focuses on exam preparation and subject mastery
- **Bible Context**: Provides spiritual guidance and scripture insights
- **Music Context**: Teaches instruments and music theory
- **Facebook Context**: Shares marketing strategies and monetization tips
- **General Context**: Answers any question and provides guidance

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interfaces
- Smooth animations and transitions

### Real-time Features
- Live chat interactions
- Auto-updating motivational quotes
- Instant AI responses
- Dynamic content loading

---

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔒 Security

- API keys stored in environment variables
- No sensitive data in frontend code
- CORS configured properly
- Input validation on all endpoints
- Rate limiting considerations

---

## 📈 Roadmap

Future enhancements planned:
- [ ] User authentication and profiles
- [ ] Progress tracking and analytics
- [ ] Virtual phone number service for WhatsApp/Facebook verification
- [ ] Live video lessons
- [ ] Community forums
- [ ] Mobile app (iOS/Android)
- [ ] Offline mode
- [ ] Multi-language support
- [ ] Advanced Bible tournament leaderboards
- [ ] Certificate generation for completed courses

---

## 🤝 Contributing

While this is a personal project by Akin S. Sokpah, suggestions and feedback are welcome!

Contact:
- Email: sokpahakinsaye81@gmail.com
- Facebook: Express AI PRO

---

## 📄 License

Copyright © 2024 Akin S. Sokpah. All rights reserved.

This project is proprietary software created by Akin S. Sokpah for educational purposes.

---

## 🙏 Acknowledgments

- **OpenAI** - For providing the GPT-3.5 API
- **Render** - For free hosting services
- **Font Awesome** - For beautiful icons
- **Google Fonts** - For Inter and Poppins fonts
- **All students** - Who will benefit from this platform

---

## 📞 Support

For questions, issues, or support:

**Creator:** Akin S. Sokpah
**Email:** sokpahakinsaye81@gmail.com
**Facebook:** Express AI PRO (Page ID: 874616512398098)

---

## 💬 Quote

> "Education is the most powerful weapon you can use to change the world." - Nelson Mandela

> "With God all things are possible." - Matthew 19:26

---

## 🌟 Mission Statement

Global Light is dedicated to empowering students globally through AI-powered education, faith-based learning, and practical skills development. We combine cutting-edge AI technology with timeless biblical wisdom to create a comprehensive learning platform that transforms lives.

**Empowering minds, strengthening faith, building futures.**

---

Made with ❤️ by Akin S. Sokpah in Liberia 🇱🇷

Visit us: [Your Render URL]
Follow us: [Facebook - Express AI PRO]
Contact: sokpahakinsaye81@gmail.com
