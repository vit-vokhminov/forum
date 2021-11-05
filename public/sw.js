
const staticCacheName = 's-app-v1';

self.addEventListener('install', async (event) => {
    const cache = await caches.open(staticCacheName);

    const filesCache = await fetch(`/files.json`)
        .then((response) => response.json())
        .then((data) => Object.values(data));

    await cache.addAll(filesCache);
});

self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter((name) => name !== staticCacheName)
            .map((name) => caches.delete(name))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? (await fetch(request));
}
