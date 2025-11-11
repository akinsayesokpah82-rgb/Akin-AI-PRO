# 🌟 Global Light Educational Platform - Complete Deployment Guide

**Created by: Akin S. Sokpah**
**Email: sokpahakinsaye81@gmail.com**
**Facebook: Express AI PRO (Page ID: 874616512398098)**

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Your OpenAI API Key](#getting-your-openai-api-key)
3. [Local Development Setup](#local-development-setup)
4. [GitHub Setup](#github-setup)
5. [Render Deployment](#render-deployment)
6. [Environment Variables Configuration](#environment-variables-configuration)
7. [Testing Your Deployment](#testing-your-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🛠️ Prerequisites

Before you begin, make sure you have:

- A GitHub account (free): https://github.com/signup
- A Render account (free): https://render.com/register
- An OpenAI account: https://platform.openai.com/signup
- Git installed on your computer
- Node.js 18+ installed (check with `node --version`)

---

## 🔑 Getting Your OpenAI API Key

### Step 1: Create OpenAI Account

1. Go to https://platform.openai.com/signup
2. Sign up with your email or Google account
3. Verify your email address

### Step 2: Get API Key

1. Go to https://platform.openai.com/api-keys
2. Click **"Create new secret key"**
3. Give it a name like "Global Light Platform"
4. **IMPORTANT**: Copy the key immediately and save it somewhere safe
   - You won't be able to see it again!
   - It looks like: `sk-proj-...`

### Step 3: Add Billing (Required)

OpenAI requires a payment method even for free tier:

1. Go to https://platform.openai.com/account/billing/overview
2. Click **"Add payment method"**
3. Add your credit/debit card
4. Set up usage limits to prevent unexpected charges:
   - Recommended: Set a $5-10 monthly limit
   - The platform is very affordable (usually $0.002 per request)

---

## 💻 Local Development Setup

### Step 1: Navigate to Your Project

```bash
cd /vercel/sandbox
```

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

### Step 3: Create Environment File

```bash
# Copy the example file
cp ../.env.example .env

# Edit the .env file and add your OpenAI API key
# Replace 'your_openai_api_key_here' with your actual key
```

Your `.env` file should look like this:

```
PORT=10000
OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_KEY_HERE
NODE_ENV=development
```

### Step 4: Test Locally

```bash
npm start
```

Open your browser and go to: http://localhost:10000

**You should see:**
- The Global Light homepage
- All features working
- Motivational quotes loading
- Chat interfaces ready

---

## 📦 GitHub Setup

### Step 1: Initialize Git Repository (if not already done)

```bash
# From the /vercel/sandbox directory
git init
git add .
git commit -m "Initial commit: Global Light Educational Platform"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `global-light-platform`
3. Description: `AI-powered educational platform for WASSCE/WAEC prep, Bible studies, music courses, and more`
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (you already have files)
6. Click **"Create repository"**

### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/global-light-platform.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Create .gitignore (Important!)

Create a `.gitignore` file to prevent sensitive files from being uploaded:

```bash
cat > .gitignore << 'EOF'
# Environment variables (NEVER commit these!)
.env
backend/.env

# Dependencies
node_modules/
backend/node_modules/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
EOF

git add .gitignore
git commit -m "Add .gitignore file"
git push
```

---

## 🚀 Render Deployment

### Step 1: Sign Up for Render

1. Go to https://render.com/register
2. Sign up with GitHub (recommended) or email
3. Authorize Render to access your GitHub account

### Step 2: Create New Web Service

1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub account if not already connected
4. Find and select your `global-light-platform` repository
5. Click **"Connect"**

### Step 3: Configure Web Service

Fill in the following details:

**Basic Settings:**
- **Name**: `global-light-platform` (or any name you prefer)
- **Region**: Choose closest to your location
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (perfect for starting out)
  - Note: Free tier sleeps after 15 minutes of inactivity
  - First request may take 30-50 seconds to wake up

### Step 4: Configure Environment Variables

**This is the most important step!**

1. Scroll down to **"Environment Variables"**
2. Click **"Add Environment Variable"**
3. Add the following variables:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | `your_actual_openai_key_here` |
| `NODE_ENV` | `production` |
| `PORT` | `10000` |

**SECURITY NOTES:**
- ✅ It's safe to add your OpenAI key in Render's environment variables
- ✅ These variables are encrypted and never visible in logs
- ❌ NEVER commit your `.env` file to GitHub
- ❌ NEVER share your OpenAI API key publicly

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying your application
3. Watch the deployment logs in real-time
4. Wait for the status to show **"Live"** (usually 2-5 minutes)

### Step 6: Get Your URL

Once deployed, you'll see your live URL:
```
https://global-light-platform.onrender.com
```

This is your live website! Share it with students worldwide.

---

## 🔧 Environment Variables Configuration

### In Render Dashboard

To update environment variables after deployment:

1. Go to your service dashboard
2. Click **"Environment"** in the left sidebar
3. Update or add variables
4. Click **"Save Changes"**
5. Your service will automatically redeploy

### Variables Explained

```bash
# PORT - Render assigns this automatically, but we set default to 10000
PORT=10000

# OPENAI_API_KEY - Your secret API key from OpenAI
# This enables all AI-powered features:
# - WASSCE/WAEC tutoring
# - Bible study assistant
# - Music course teacher
# - Facebook marketing expert
# - General chat assistant
OPENAI_API_KEY=sk-proj-...

# NODE_ENV - Tells the app it's in production mode
NODE_ENV=production
```

---

## ✅ Testing Your Deployment

### Step 1: Access Your Site

Open your Render URL in a browser:
```
https://your-app-name.onrender.com
```

### Step 2: Test All Features

#### 1. Home Page
- ✅ Should see "Welcome to Global Light"
- ✅ Motivational quote should display
- ✅ Feature badges should be visible

#### 2. WASSCE/WAEC Section
- ✅ Click on a subject (e.g., Mathematics)
- ✅ Ask a question: "Explain Pythagoras theorem"
- ✅ Should receive detailed AI explanation

#### 3. Bible Study
- ✅ Click "New Verse" button
- ✅ Ask a question in the Bible chat
- ✅ Try the Bible Tournament

#### 4. Courses Section
- ✅ Click "Start Learning" on Piano
- ✅ Ask: "How do I play a C major chord?"
- ✅ Should receive teaching response

#### 5. Facebook Marketing
- ✅ View topics list
- ✅ Ask about Facebook ads or monetization

#### 6. General Chat
- ✅ Ask any question
- ✅ Try: "Who created this platform?"

### Step 3: Test on Mobile

- Open the site on your phone
- Verify responsive design works
- Test mobile menu
- Try different features

---

## 🐛 Troubleshooting

### Problem: "Application failed to start"

**Solution:**
1. Check Render logs for specific errors
2. Verify `backend/package.json` exists
3. Ensure `npm install` runs successfully
4. Check that `backend/server.js` exists

### Problem: AI features not working

**Symptoms:** Chat returns "offline mode" or error messages

**Solution:**
1. Go to Render Dashboard → Environment
2. Verify `OPENAI_API_KEY` is set correctly
3. Check OpenAI account has billing enabled
4. Verify API key is active at https://platform.openai.com/api-keys
5. Redeploy the service

### Problem: "502 Bad Gateway" or "Service Unavailable"

**Solution:**
1. Wait 30-50 seconds (free tier waking up)
2. Check Render status: https://status.render.com
3. Check deployment logs for errors
4. Verify your app starts successfully locally

### Problem: Port already in use (locally)

**Solution:**
```bash
# Change port in your .env file
PORT=3000

# Or kill the process using port 10000
lsof -ti:10000 | xargs kill -9
```

### Problem: OpenAI API rate limits

**Symptoms:** "Rate limit exceeded" errors

**Solution:**
1. OpenAI has usage limits per minute/day
2. Free tier: 3 requests per minute
3. Paid tier: 60+ requests per minute
4. Wait a minute and try again
5. Consider upgrading OpenAI tier if needed

### Problem: Changes not showing after deployment

**Solution:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check Render logs to confirm deployment succeeded
3. Verify GitHub has latest code:
   ```bash
   git status
   git add .
   git commit -m "Update changes"
   git push
   ```
4. Trigger manual redeploy in Render

---

## 📊 Monitoring & Maintenance

### Check Application Health

Visit: `https://your-app-name.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "platform": "Global Light Educational Platform",
  "creator": "Akin S. Sokpah",
  "email": "sokpahakinsaye81@gmail.com"
}
```

### View Logs

In Render Dashboard:
1. Go to your service
2. Click **"Logs"** tab
3. Watch real-time application logs
4. Look for errors or warnings

### Monitor Costs

**OpenAI Costs:**
- Check usage: https://platform.openai.com/usage
- Average cost per request: $0.001 - $0.003
- Set monthly budget limits

**Render Costs:**
- Free tier: $0/month (with limitations)
- Starter: $7/month (always on, no sleep)

---

## 🎉 Success!

Congratulations! Your Global Light Educational Platform is now live and ready to empower students globally!

**Share your platform:**
- Facebook: Express AI PRO
- Email: sokpahakinsaye81@gmail.com
- GitHub: Your repository URL
- Live Site: Your Render URL

**Next Steps:**
1. Share with students in your network
2. Promote on social media
3. Gather feedback and improve
4. Add more features as needed
5. Monitor usage and costs

---

## 📝 Support

**Created by:** Akin S. Sokpah
**Email:** sokpahakinsaye81@gmail.com
**Facebook Page:** Express AI PRO (ID: 874616512398098)

For questions or support, reach out via email or Facebook!

---

**Remember:** Education is the most powerful weapon you can use to change the world. Keep learning, keep growing, and empower others!

🌟 **Global Light - Empowering minds, strengthening faith, building futures.** 🌟
