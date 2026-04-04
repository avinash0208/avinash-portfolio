"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export async function getFcmToken(swReg: ServiceWorkerRegistration): Promise<string | null> {
  try {
    const supported = await isSupported();
    if (!supported) return null;

    const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
    if (!vapidKey) return null;

    const app = getFirebaseApp();
    const messaging = getMessaging(app);

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: swReg,
    });

    return token || null;
  } catch (error) {
    // Never throw raw Event/object to React unhandled rejection path.
    console.error("[FCM] getFcmToken failed:", normalizeError(error));
    return null;
  }
}

export function normalizeError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "type" in error) {
    return `Event(${String((error as { type?: string }).type ?? "unknown")})`;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}
