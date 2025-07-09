self.addEventListener("install", (event) => {
    console.log("sw installed!");
    self.skipWaiting();
    event.waitUntil(
        caches
            .open("my-pwa-app")
            .then((cache) =>
                cache.addAll([
                    '/',
                    '/index.html',
                    '/contact.html',
                    '/styles.css',
                    '/app.js',
                    '/manifest.json',
                    '/icons/device.png',
                    '/icons/list.png',
                    '/icons/online-shop.png',
                ])
            )
    );
});

self.addEventListener("activate", (event) => {
    console.log("sw Activated!");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request.url).then((file) => {
            if (file) {
                console.log(file);
                console.log("inside if statment");
                return file;
            } else {
                console.log("network request");
                return fetch(event.request.url);
            }
        })
    );
});
