"use client";

import { useEffect, useState } from "react";
import { getFcmToken, normalizeError } from "@/lib/firebase-client";

type PushState = {
  supported: boolean;
  permission: NotificationPermission | "unsupported";
  token: string | null;
  status: string;
  error: string | null;
};

export default function PushNotificationCard() {
  const [swReg, setSwReg] = useState<ServiceWorkerRegistration | null>(null);
  const [state, setState] = useState<PushState>({
    supported: typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator,
    permission: typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported",
    token: null,
    status: "idle",
    error: null,
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
        error: token ? null : "FCM token unavailable. Check Firebase env/VAPID key.",
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
      if (!("Notification" in window)) return;
      if (Notification.permission !== "granted") {
        setState((prev) => ({ ...prev, error: "Grant notification permission first." }));
        return;
      }
      new Notification("Portfolio Test Notification", {
        body: "Local notification is working.",
        icon: "/favicon.ico",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: `Local notification failed: ${normalizeError(error)}`,
      }));
    }
  };

  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold">Push Notifications</h3>
      <p className="mt-2 text-sm text-muted">
        Registers service worker, requests permission, and optionally generates
        Firebase Cloud Messaging token when env vars are configured.
      </p>
      <p className="text-sm text-foreground/80">Status: {state.status}</p>
      <p className="text-sm text-foreground/80">Permission: {state.permission}</p>
      {state.token ? <p className="break-all text-xs text-foreground/70">{state.token}</p> : null}
      {state.error ? <p className="mt-2 text-sm text-red-500">{state.error}</p> : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={onRequestPermission} className="rounded-md border border-border px-3 py-1.5 text-sm">
          Request Permission
        </button>
        <button onClick={onGetToken} className="rounded-md border border-border px-3 py-1.5 text-sm">
          Get FCM Token
        </button>
        <button onClick={onTestLocalNotification} className="rounded-md border border-border px-3 py-1.5 text-sm">
          Test Local Notification
        </button>
      </div>
    </section>
  );
}
