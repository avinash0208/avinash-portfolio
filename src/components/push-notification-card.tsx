"use client";

import { useEffect, useState } from "react";
import { getFcmToken, normalizeError } from "@/lib/firebase-client";

type PushState = {
  supported: boolean;
  permission: NotificationPermission | "unsupported";
  token: string | null;
  status: string;
  error: string | null;
  notificationSent: boolean;
};

export default function PushNotificationCard() {
  const [swReg, setSwReg] = useState<ServiceWorkerRegistration | null>(null);
  const [state, setState] = useState<PushState>({
    supported: typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator,
    permission: typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported",
    token: null,
    status: "idle",
    error: null,
    notificationSent: false,
  });

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      if (!("serviceWorker" in navigator) || !("Notification" in window)) return;

      try {
        setState((prev) => ({ ...prev, status: "registering-sw", error: null }));
        const reg = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        if (!mounted) return;

        setSwReg(reg);
        setState((prev) => ({ ...prev, status: "ready" }));
      } catch (error) {
        if (!mounted) return;
        setState((prev) => ({
          ...prev,
          status: "error",
          error: `SW registration failed: ${normalizeError(error)}`,
        }));
      }
    };

    void init();

    return () => {
      mounted = false;
    };
  }, []);

  const onRequestPermission = async () => {
    try {
      if (!("Notification" in window)) return;
      const permission = await Notification.requestPermission();
      setState((prev) => ({ ...prev, permission, error: null }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: `Permission request failed: ${normalizeError(error)}`,
      }));
    }
  };

  const onGetToken = async () => {
    try {
      if (!swReg) {
        setState((prev) => ({ ...prev, error: "Service worker not ready yet." }));
        return;
      }
      setState((prev) => ({ ...prev, status: "fetching-token", error: null }));
      const token = await getFcmToken(swReg);

      setState((prev) => ({
        ...prev,
        token,
        status: "ready",
        error: token ? null : "Failed to generate token.",
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: `Token fetch failed: ${normalizeError(error)}`,
      }));
    }
  };

  const onTestLocalNotification = async () => {
    try {
      if (!("Notification" in window)) {
        setState((prev) => ({ ...prev, error: "Notifications not supported." }));
        return;
      }

      if (Notification.permission !== "granted") {
        setState((prev) => ({ ...prev, error: "Grant notification permission first." }));
        return;
      }

      if (!swReg) {
        setState((prev) => ({ ...prev, error: "Service worker not ready yet." }));
        return;
      }

      // Send notification through service worker for better reliability
      setState((prev) => ({ ...prev, status: "sending-notification", error: null, notificationSent: false }));

      await swReg.showNotification("Portfolio Test Notification", {
        body: "Local notification is working. This was sent from the service worker.",
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "test-notification",
        requireInteraction: false,
      });

      setState((prev) => ({
        ...prev,
        status: "ready",
        notificationSent: true,
        error: null,
      }));

      // Clear success message after 3 seconds
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, notificationSent: false }));
      }, 3000);

      return () => clearTimeout(timer);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: `Notification failed: ${normalizeError(error)}`,
      }));
    }
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold">Push Notifications</h3>
      <p className="mt-2 text-sm text-muted">
        Registers service worker, requests permission, and generates FCM token.
        (Demo mode shows mock token when Firebase env vars not configured.)
      </p>
      <p className="text-sm text-foreground/80">Status: {state.status}</p>
      <p className="text-sm text-foreground/80">Permission: {state.permission}</p>
      {state.token ? <p className="break-all text-xs text-foreground/70">{state.token}</p> : null}
      {state.notificationSent && (
        <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400">✓ Notification sent! Check your notifications.</p>
      )}
      {state.error ? <p className="mt-2 text-sm text-red-500">{state.error}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onRequestPermission} className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm hover:border-accent transition">
          Request Permission
        </button>
        <button onClick={onGetToken} className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm hover:border-accent transition">
          Get FCM Token
        </button>
        <button onClick={onTestLocalNotification} className="cursor-pointer rounded-md border border-border px-3 py-1.5 text-sm hover:border-accent transition">
          Test Local Notification
        </button>
      </div>
    </section>
  );
}
