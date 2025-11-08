import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';
import { getDatabase, ref, push, onChildAdded, set, onValue } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js';
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js';

// Firebase web config (user provided)
const firebaseConfig = {
  apiKey: "AIzaSyC7cAN-mrE2PvmlQ11zLKAdHBhN7nUFjHw",
  authDomain: "fir-u-c-students-web.firebaseapp.com",
  databaseURL: "https://fir-u-c-students-web-default-rtdb.firebaseio.com",
  projectId: "fir-u-c-students-web",
  storageBucket: "fir-u-c-students-web.firebasestorage.app",
  messagingSenderId: "113569186739",
  appId: "1:113569186739:web:d8daf21059f43a79e841c6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);
const storage = getStorage(app);

const messagesEl = document.getElementById('messages');
const composer = document.getElementById('composer');
const textInput = document.getElementById('text');
const fileInput = document.getElementById('file');
const userBox = document.getElementById('user-box');
const status = document.getElementById('status');
const typingEl = document.getElementById('typing');
const inviteBtn = document.getElementById('inviteBtn');

let currentUser = null;
let typingTimeout = null;
let isTyping = false;

onAuthStateChanged(auth, (user)=> {
  currentUser = user;
  renderUser();
  if(user) listenMessages();
  else messagesEl.innerHTML = '<div class="msg">Sign in to join the chat.</div>';
});

function renderUser(){
  if(!currentUser){
    userBox.innerHTML = '<button id="loginBtn" class="ghost">Sign in with Google</button>';
    document.getElementById('loginBtn').addEventListener('click', async ()=>{
      try{ await signInWithPopup(auth, provider); }catch(e){ alert('Login failed: '+e.message); }
    });
    status.textContent = 'offline';
  } else {
    userBox.innerHTML = `<div style="display:flex;align-items:center;gap:10px"><img src="${currentUser.photoURL}" width="44" style="border-radius:50%"/><div><strong style="color:#fff">${currentUser.displayName}</strong><div style="font-size:12px;color:#9fb1c6">${currentUser.email}</div></div></div>`;
    status.textContent = 'online';
    document.getElementById('signout').addEventListener('click', ()=> signOut(auth));
  }
}

// messages
function listenMessages(){
  const messagesRef = ref(db,'groups/university_students/messages');
  onChildAdded(messagesRef, (snap)=> {
    const m = snap.val();
    appendMessage(m);
  });
}

// append single message
function appendMessage(m){
  const d = document.createElement('div');
  d.className = 'msg' + ((currentUser && m.uid === currentUser.uid)?' you':'');
  const meta = `<div class="meta">${m.sender||m.uid} • ${new Date(m.timestamp||Date.now()).toLocaleString()}</div>`;
  let content = m.text;
  if(m.fileUrl) content += `<div><a href="${m.fileUrl}" target="_blank">View attachment</a></div>`;
  d.innerHTML = meta + '<div>' + content + '</div>';
  messagesEl.appendChild(d);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// typing indicator broadcast (simple)
textInput?.addEventListener('input', ()=> {
  if(!currentUser) return;
  const tRef = ref(db, 'typing/'+currentUser.uid);
  set(tRef, { name: currentUser.displayName, ts: Date.now() });
  if(typingTimeout) clearTimeout(typingTimeout);
  typingTimeout = setTimeout(()=> set(tRef, null), 2000);
});

// show typing users
const typingRef = ref(db,'typing');
onValue(typingRef, (snap)=> {
  const val = snap.val() || {};
  const others = Object.values(val).filter(v=> v && (!currentUser || v.name !== currentUser.displayName));
  typingEl.textContent = others.length ? `${others.map(o=>o.name).join(', ')} is typing...` : '';
});

// send message with optional file
composer?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const text = textInput.value.trim();
  if(!text && !fileInput.files.length) return;
  const uid = currentUser?.uid || ('guest_'+Date.now());
  let fileUrl = null;
  if(fileInput.files.length){
    const file = fileInput.files[0];
    const storageRef = sref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await new Promise((res, rej)=> {
      uploadTask.on('state_changed', ()=>{}, (err)=> rej(err), async ()=> {
        fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        res();
      });
    });
  }
  const msg = { uid, sender: currentUser?.displayName || 'Guest', text, fileUrl, timestamp: Date.now() };
  await push(ref(db,'groups/university_students/messages'), msg);
  textInput.value = ''; fileInput.value = '';
  // If message mentions bot, call backend to generate AI reply (bot also listens)
  if(text.toLowerCase().includes('@akinexpressai') || text.toLowerCase().includes('akinexpressai')){
    try{
      await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message: text }) });
    }catch(e){ console.error('AI call failed', e.message); }
  }
});

inviteBtn?.addEventListener('click', ()=> {
  const url = location.href + '?invite=university_students';
  navigator.clipboard.writeText(url).then(()=> alert('Invite link copied!'));
});
