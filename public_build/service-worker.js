"use strict";var precacheConfig=[["./index.html","cba84ce4af06797e93b085759bb0634e"],["./static/css/main.c1858e8c.css","cd71a865bba081e75d6cda9ea4b91eca"],["./static/js/main.27fce8d0.js","b3b8698002b157a67aaee2f6eeff886d"],["./static/media/android-icon-144x144.f9024efb.png","f9024efb3e8b1e31dc7ddb61c2740f8d"],["./static/media/android-icon-192x192.391c2891.png","391c289166d126663bd42f7e76584771"],["./static/media/android-icon-96x96.0f682c8e.png","0f682c8e3c5c3c1eb77ed1a70784800f"],["./static/media/apple-icon-114x114.6593d9eb.png","6593d9eb828dde983f0c3dcc1d54b6d8"],["./static/media/apple-icon-120x120.98595843.png","98595843a12d020470d58c6224062509"],["./static/media/apple-icon-144x144.f9024efb.png","f9024efb3e8b1e31dc7ddb61c2740f8d"],["./static/media/apple-icon-152x152.831e52da.png","831e52da23426ea07d6547ebffa2b393"],["./static/media/apple-icon-180x180.05e0b391.png","05e0b3913d9439db5e592b8fa3d43f46"],["./static/media/apple-icon.e3b00478.png","e3b00478fc4016d75eeaecd15e937d80"],["./static/media/favicon-96x96.0f682c8e.png","0f682c8e3c5c3c1eb77ed1a70784800f"],["./static/media/favicon.10a9f316.ico","10a9f3163cf879b2603b59fb7230f539"],["./static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["./static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["./static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["./static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["./static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["./static/media/glyphicons-halflings-regular.448c34a5.woff2","448c34a56d699c29117adc64c43affeb"],["./static/media/glyphicons-halflings-regular.89889688.svg","89889688147bd7575d6327160d64e760"],["./static/media/glyphicons-halflings-regular.e18bbf61.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["./static/media/glyphicons-halflings-regular.f4769f9b.eot","f4769f9bdb7466be65088239c12046d1"],["./static/media/glyphicons-halflings-regular.fa277232.woff","fa2772327f55d8198301fdb8bcfc8158"],["./static/media/icon.c964ab42.png","c964ab426e0c8bafb5ed3bf367b4a5ca"],["./static/media/image-spinner.768b228e.gif","768b228e0d0ea7cf343e1dedfb4ddd6e"],["./static/media/loader.4453fb7f.gif","4453fb7f36c446ed6e00a9071c43964a"],["./static/media/ms-icon-144x144.f9024efb.png","f9024efb3e8b1e31dc7ddb61c2740f8d"],["./static/media/ms-icon-150x150.480ba292.png","480ba292542a697f772dcac62676b504"],["./static/media/ms-icon-310x310.dbcf818a.png","dbcf818aa84b8dd867718eab92d7164c"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),a=urlsToCacheKeys.has(t));var c="./index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(c,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});