# Akin Express AI — Pro UI Package

This upgraded package contains an enhanced frontend and backend for Akin Express AI with:
- Modern, responsive UI with more polished styling and components.
- Google Sign-in (Firebase Web SDK) and Realtime Group Chat (Realtime Database).
- AI assistant integration via OpenAI (backend). Bot replies when mentioned (@akinexpressai).
- File upload UI (uploads to Firebase Storage using web SDK).
- Message reactions, typing indicator, invites, chat history, avatars.
- Backend serves frontend and provides /api/chat using OPENAI_API_KEY env var.
- Bot posts gospel notifications every 4 minutes and responds with owner info when asked.

IMPORTANT:
- Do NOT commit your Firebase service account to GitHub. Use Render environment variables.
- Set the following env vars in Render: FIREBASE_SERVICE_ACCOUNT (JSON), FIREBASE_DATABASE_URL, OPENAI_API_KEY (optional), PORT (optional).

Files in this ZIP are ready to upload into a fresh GitHub repo and deploy to Render (root -> backend).
