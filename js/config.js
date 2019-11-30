
// Copyright (c) 2017-2019 Chen Peleg
//config js with game comunication ########## english translate
G = {}; // the global data object

   G.devMode = false; // developer mode => 1 = endlevel
   G.name_of_game = "האקר"
   G.name_of_gameEN = 'Hacker';
   G.dev_mode = 1; //change back to 0
   G.EN = 1; // english

   G.fileName = location.pathname.split("/").slice(-1)[0].replace(/\.html/ig,"")
   G.saveInLocalStorageKey = G.fileName
   function activateClick (){

       async function getClicktScript(url, urlGetPrams) {
           urlGetPrams += "&gameName=" +  G.saveInLocalStorageKey
           let response = await fetch(url + "?" + urlGetPrams , {
               method: 'GET',
               mode: 'cors',
               cache: 'no-cache',
               credentials: 'same-origin',
               headers: {
                   'Content-Type': 'text/plain',
               },
               redirect: 'follow',
               referrer: 'no-referrer',
           })
           let responseScript = await response.text();
           let script = document.createElement('script');
           script.innerHTML =  responseScript ;//responseScript    // "clickScript.js"
           document.body.appendChild(script)
       }
       function loadGameFrom (source){
           if (source === 'ls') {
               // default loads from css;
           }
           if (source === 'clear') {
               localStorage.setItem(G.saveInLocalStorageKey,"")
           }
           if (source === 'url'){
               let loadedGame = JSON.parse(urlParams.get( G.saveInLocalStorageKey));
               localStorage.setItem(G.saveInLocalStorageKey, JSON.stringify(loadedGame));
           }

       }
       const urlParams = new URLSearchParams(window.location.search);
       const lsString = localStorage.getItem(G.saveInLocalStorageKey)
       const saveFromSS = lsString ? JSON.parse(lsString) : false
       const saveFromURL = urlParams.get(G.saveInLocalStorageKey) || false;
       const urlName = urlParams.get('userFullName') ?  urlParams.get('userFullName') : false
       const lsName = saveFromSS.nameOfplayer || false;
       if (!urlParams.has('api')) {
           console.log('%c no site Connection - game saved on this PC \n אין חיבור לאתר, המשחק ישמר על מחשב זה', 'font-family:david; font-size: 3vmin; background: gold; color:blue;');
           G.saveInLocalStorageKey = G.fileName + "_Local";
         G.isTheGameConnectedToClick = false;
           return
       }
       if (saveFromURL && saveFromSS && (urlName === lsName) ){
           const urlTime = Number(saveFromURL.lst_) || 0
           const lsTime =  Number(saveFromSS.lst_) || 0
           const higher = Math.max(urlTime,lsTime)
           if (higher === lsTime) {loadGameFrom ('ls')}
           else if (higher === urlTime) {loadGameFrom ('url')}

       } else if (saveFromSS && (urlName === lsName)) {
           loadGameFrom ('ls')
       } else if (saveFromURL) {
           loadGameFrom ('url')
       } else if (urlName){
           G.clickFullNameOfUser = urlName;
           loadGameFrom ('clear')
       }
       G.isTheGameConnectedToClick = true;
       getClicktScript (urlParams.get('api'), urlParams.toString())
   }
   activateClick ()
