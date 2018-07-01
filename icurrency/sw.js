self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('icurrencyv2.0').then(function(cache) {
     return cache.addAll([
       '/2018/Apps/icurrency/',
       '/2018/Apps/icurrency/index.html',
       '/2018/Apps/icurrency/css/custom.css',
       '/2018/Apps/icurrency/css/uikit-rtl.css',
       '/2018/Apps/icurrency/css/uikit-rtl.min.css',
       '/2018/Apps/icurrency/css/uikit.css',
       '/2018/Apps/icurrency/js/main.js',
       '/2018/Apps/icurrency/js/uikit-icons.js',
       '/2018/Apps/icurrency/js/uikit-icons.min.js',
        '/2018/Apps/icurrency/js/uikit.js',
       '/2018/Apps/icurrency/js/uikit.min.js'
     ]);
   })
 );
});
self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);


  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

