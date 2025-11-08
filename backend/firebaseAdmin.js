import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

export function initFirebaseAdmin() {
  if (admin.apps.length) return admin;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT not set');
  let svc;
  try {
    svc = JSON.parse(raw);
  } catch (e) {
    throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT JSON: '+e.message);
  }
  if (!svc.private_key) throw new Error('service account missing private_key');
  svc.private_key = svc.private_key.replace(/\\n/g,'\n');
  admin.initializeApp({
    credential: admin.credential.cert(svc),
    databaseURL: process.env.FIREBASE_DATABASE_URL || `https://${svc.project_id}-default-rtdb.firebaseio.com`
  });
  return admin;
}
