// ========================================
// GLOBAL LIGHT EDUCATIONAL PLATFORM
// Frontend JavaScript with All Interactions
// Created by: Akin S. Sokpah
// ========================================

console.log('🌟 Global Light Educational Platform Loading...');

// ========================================
// NAVIGATION & UI
// ========================================

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// MOTIVATIONAL QUOTES
// ========================================

async function loadMotivationalQuote() {
    try {
        const response = await fetch('/api/motivation/current');
        const data = await response.json();
        document.getElementById('motivationQuote').textContent = data.quote;
    } catch (error) {
        console.error('Failed to load motivational quote:', error);
        document.getElementById('motivationQuote').textContent =
            'Education is the most powerful weapon you can use to change the world. - Nelson Mandela';
    }
}

// Load initial quote
loadMotivationalQuote();

// Update quote every 30 minutes
setInterval(loadMotivationalQuote, 30 * 60 * 1000);

// Floating motivation button
document.getElementById('floatingMotivation')?.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/motivation/all');
        const data = await response.json();
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        alert(randomQuote);
    } catch (error) {
        alert('Stay motivated! Every step forward is progress.');
    }
});

// ========================================
// WASSCE/WAEC EXAM PREPARATION
// ========================================

let selectedSubject = null;

async function loadWASSCESubjects() {
    try {
        const response = await fetch('/api/wassce/subjects');
        const data = await response.json();
        const subjectGrid = document.getElementById('subjectGrid');

        data.subjects.forEach(subject => {
            const btn = document.createElement('button');
            btn.className = 'subject-btn';
            btn.textContent = subject.toUpperCase();
            btn.onclick = () => selectSubject(subject, btn);
            subjectGrid.appendChild(btn);
        });
    } catch (error) {
        console.error('Failed to load subjects:', error);
    }
}

function selectSubject(subject, btnElement) {
    // Remove active class from all buttons
    document.querySelectorAll('.subject-btn').forEach(btn => btn.classList.remove('active'));
    // Add active class to clicked button
    btnElement.classList.add('active');
    selectedSubject = subject;

    // Add message to chat
    addWASSCEMessage(`You've selected ${subject.toUpperCase()}. Ask me anything about this subject!`, 'bot');
}

function addWASSCEMessage(text, sender = 'bot') {
    const messagesDiv = document.getElementById('wassceChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
    msgDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// WASSCE Send Button
document.getElementById('wassceSendBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('wassceInput');
    const question = input.value.trim();

    if (!question) return;

    // Add user message
    addWASSCEMessage(question, 'user');
    input.value = '';

    // Show loading
    addWASSCEMessage('<span class="loading"></span> Thinking...', 'bot');

    try {
        const response = await fetch('/api/wassce/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: selectedSubject,
                question: question
            })
        });

        const data = await response.json();

        // Remove loading message
        const messages = document.getElementById('wassceChatMessages');
        messages.removeChild(messages.lastChild);

        // Add AI response
        addWASSCEMessage(data.answer, 'bot');
    } catch (error) {
        const messages = document.getElementById('wassceChatMessages');
        messages.removeChild(messages.lastChild);
        addWASSCEMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
});

// Enter key support for WASSCE input
document.getElementById('wassceInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('wassceSendBtn').click();
    }
});

// Load subjects on page load
loadWASSCESubjects();

// ========================================
// BIBLE STUDY & GOSPEL
// ========================================

async function loadRandomVerse() {
    try {
        const response = await fetch('/api/bible/random');
        const data = await response.json();
        document.getElementById('verseRef').textContent = data.verse;
        document.getElementById('verseText').textContent = data.text;
    } catch (error) {
        console.error('Failed to load verse:', error);
    }
}

// Load initial verse
loadRandomVerse();

// Refresh verse button
document.getElementById('refreshVerseBtn')?.addEventListener('click', loadRandomVerse);

function addBibleMessage(text, sender = 'bot') {
    const messagesDiv = document.getElementById('bibleChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
    msgDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Bible chat send button
document.getElementById('bibleSendBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('bibleInput');
    const message = input.value.trim();

    if (!message) return;

    addBibleMessage(message, 'user');
    input.value = '';

    addBibleMessage('<span class="loading"></span> Seeking guidance...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context: 'bible' })
        });

        const data = await response.json();

        const messages = document.getElementById('bibleChatMessages');
        messages.removeChild(messages.lastChild);

        addBibleMessage(data.reply, 'bot');
    } catch (error) {
        const messages = document.getElementById('bibleChatMessages');
        messages.removeChild(messages.lastChild);
        addBibleMessage('May God guide you. Please try again.', 'bot');
    }
});

// Enter key support
document.getElementById('bibleInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('bibleSendBtn').click();
    }
});

// ========================================
// BIBLE TOURNAMENT
// ========================================

let currentTournamentQuestion = null;

async function loadTournamentQuestion() {
    try {
        const response = await fetch('/api/bible/tournament/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        currentTournamentQuestion = data;
        document.getElementById('tournamentQuestion').textContent = data.question;
        document.getElementById('tournamentAnswer').value = '';
        document.getElementById('tournamentResult').textContent = '';
        document.getElementById('tournamentResult').className = 'tournament-result';
    } catch (error) {
        console.error('Failed to load tournament question:', error);
    }
}

document.getElementById('newQuestionBtn')?.addEventListener('click', loadTournamentQuestion);

document.getElementById('submitAnswerBtn')?.addEventListener('click', () => {
    const userAnswer = document.getElementById('tournamentAnswer').value.trim();
    const resultDiv = document.getElementById('tournamentResult');

    if (!userAnswer) {
        resultDiv.textContent = 'Please enter an answer!';
        resultDiv.className = 'tournament-result incorrect';
        return;
    }

    if (!currentTournamentQuestion) {
        resultDiv.textContent = 'Please click "New Question" first!';
        resultDiv.className = 'tournament-result incorrect';
        return;
    }

    const correctAnswer = currentTournamentQuestion.answer.toLowerCase();
    const userAnswerLower = userAnswer.toLowerCase();

    // Check if answer is correct (allowing some flexibility)
    if (userAnswerLower.includes(correctAnswer) || correctAnswer.includes(userAnswerLower)) {
        resultDiv.textContent = `✓ Correct! The answer is ${currentTournamentQuestion.answer}`;
        resultDiv.className = 'tournament-result correct';
    } else {
        resultDiv.textContent = `✗ The correct answer is ${currentTournamentQuestion.answer}. Keep studying!`;
        resultDiv.className = 'tournament-result incorrect';
    }
});

// ========================================
// MUSIC COURSES
// ========================================

let currentCourse = null;

document.querySelectorAll('.course-card').forEach(card => {
    card.querySelector('.btn-course')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseName = card.dataset.course;
        openCourse(courseName);
    });
});

function openCourse(courseName) {
    currentCourse = courseName;
    const container = document.getElementById('courseChatContainer');
    const title = document.getElementById('courseTitle');

    title.textContent = `${courseName.charAt(0).toUpperCase() + courseName.slice(1)} Teacher`;
    container.style.display = 'flex';

    // Clear previous messages
    const messagesDiv = document.getElementById('courseChatMessages');
    messagesDiv.innerHTML = '';

    addCourseMessage(`Welcome to ${courseName} lessons! I'm your AI music teacher. What would you like to learn today?`, 'bot');

    // Scroll to course section
    container.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('closeCourseBtn')?.addEventListener('click', () => {
    document.getElementById('courseChatContainer').style.display = 'none';
    currentCourse = null;
});

function addCourseMessage(text, sender = 'bot') {
    const messagesDiv = document.getElementById('courseChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
    msgDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('courseSendBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('courseInput');
    const message = input.value.trim();

    if (!message) return;

    addCourseMessage(message, 'user');
    input.value = '';

    addCourseMessage('<span class="loading"></span> Teaching...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: `I'm learning ${currentCourse}. ${message}`,
                context: 'music'
            })
        });

        const data = await response.json();

        const messages = document.getElementById('courseChatMessages');
        messages.removeChild(messages.lastChild);

        addCourseMessage(data.reply, 'bot');
    } catch (error) {
        const messages = document.getElementById('courseChatMessages');
        messages.removeChild(messages.lastChild);
        addCourseMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
});

document.getElementById('courseInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('courseSendBtn').click();
    }
});

// ========================================
// FACEBOOK MARKETING
// ========================================

async function loadFacebookTopics() {
    try {
        const response = await fetch('/api/facebook-marketing/topics');
        const data = await response.json();
        const topicsList = document.getElementById('fbTopicsList');

        data.topics.forEach((topic, index) => {
            const topicDiv = document.createElement('div');
            topicDiv.className = 'topic-item';
            topicDiv.textContent = `${index + 1}. ${topic}`;
            topicsList.appendChild(topicDiv);
        });
    } catch (error) {
        console.error('Failed to load Facebook topics:', error);
    }
}

function addFBMessage(text, sender = 'bot') {
    const messagesDiv = document.getElementById('fbChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
    msgDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('fbSendBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('fbInput');
    const message = input.value.trim();

    if (!message) return;

    addFBMessage(message, 'user');
    input.value = '';

    addFBMessage('<span class="loading"></span> Analyzing strategy...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, context: 'facebook' })
        });

        const data = await response.json();

        const messages = document.getElementById('fbChatMessages');
        messages.removeChild(messages.lastChild);

        addFBMessage(data.reply, 'bot');
    } catch (error) {
        const messages = document.getElementById('fbChatMessages');
        messages.removeChild(messages.lastChild);
        addFBMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
});

document.getElementById('fbInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('fbSendBtn').click();
    }
});

loadFacebookTopics();

// ========================================
// GENERAL AI CHAT ASSISTANT
// ========================================

function addGeneralMessage(text, sender = 'bot') {
    const messagesDiv = document.getElementById('generalChatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'bot' ? 'bot-message' : 'user-message';
    msgDiv.innerHTML = `<p>${text}</p>`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

document.getElementById('generalSendBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('generalInput');
    const message = input.value.trim();

    if (!message) return;

    addGeneralMessage(message, 'user');
    input.value = '';

    addGeneralMessage('<span class="loading"></span> Thinking...', 'bot');

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        const messages = document.getElementById('generalChatMessages');
        messages.removeChild(messages.lastChild);

        addGeneralMessage(data.reply, 'bot');
    } catch (error) {
        const messages = document.getElementById('generalChatMessages');
        messages.removeChild(messages.lastChild);
        addGeneralMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
});

document.getElementById('generalInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('generalSendBtn').click();
    }
});

// ========================================
// INITIALIZATION
// ========================================

console.log('✅ Global Light Educational Platform Ready!');
console.log('📧 Created by: Akin S. Sokpah (sokpahakinsaye81@gmail.com)');
