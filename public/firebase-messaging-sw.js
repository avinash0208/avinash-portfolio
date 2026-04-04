/*
  Firebase messaging service worker placeholder.
  Wire actual firebase config and handlers during the notifications implementation phase.
*/
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const data = event?.data?.json?.() ?? {};
        const title = data?.notification?.title || "Notification";
        const options = {
          body: data?.notification?.body || "",
          icon: data?.notification?.icon || "/favicon.ico",
          data: data?.data || {},
        };
        await self.registration.showNotification(title, options);
      } catch (error) {
        // Prevent raw Event/object surfacing as unhandled rejection
        console.error("[SW] push handler error", error);
      }
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    (async () => {
      try {
        const target = event?.notification?.data?.url || "/";
        const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });
        for (const client of allClients) {
          if ("focus" in client) {
            await client.focus();
            return;
          }
        }
        await clients.openWindow(target);
      } catch (error) {
        console.error("[SW] notificationclick handler error", error);
      }
    })(),
  );
});
