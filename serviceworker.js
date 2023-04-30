const CACHE_NAME = "version1";// cache save 
const urlsToCache = ['index.html', 'offline.html'];// builds  cache right after finishing service worker and offline.html is going to represent the page when user got offline
const self = this;// get rid of warning because this in service worker file actually represent the service worker

// Install Sw serviceworker
self.addEventListener('install', (event)=>{// opening the cavhe service
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache)=>{
                console.log("Opend cache ")

                return cache.addAll(urlsToCache)
            })
    )
})

// Listen for Requests
self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
            .then(()=>{
                return fetch(event.request)// when there is no internet to fetch it will return this response
                            .catch(()=> caches.match('offline.html'))
            })
    )
})

// Activate the serviceworker
self.addEventListener('activate', (event)=>{
    const cacheWhitelist = [];// chche keys white list which is not gonna be removed
    cacheWhitelist.push(CACHE_NAME)// adding cache to whitelist
    event.waitUntil(// event waits for response
        caches.keys()// all cache keys
            .then((cacheNames)=> Promise.all(cacheNames.map((cacheName) =>{ // all cache keys is in cache name array all cache names is chcked in the if 
                if(!cacheWhitelist.includes(cacheName)){// if cache name is not in the whitelist then it will be removed
                    return caches.delete(cacheName)// removing cacahe
                }

                }
            )))
    )
})