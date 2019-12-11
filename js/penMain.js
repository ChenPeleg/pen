
var G = {};
G.Q = _Q_object.QuestionsArray;
G.V = [];
utils:{
    function L (...args){
        return console.log(...args)
        let txtcolor1 = 'black';
        let txtcolor2 = 'blue';
        let colorForText = 'green';
        let colorForNumber = 'purple';
        let colors = ['#FAF1E1','#F2EAC1','#F5EAD1', '#F1FFDA ', '#DFEFFF','#E4DFFF', '#FDDFCD', '#FFEAEF']
        let rnd = getRandomInt(colors.length) -1;
        var styles = ['background:' + colors [rnd], 'color: black', 'font-size:14px', 'line-height: 14px', 'font-weight: regular', ' display: inline-block' , 'border: 0px solid ' + colors [rnd], 'position:fixed', 'left:300px'].join(';');
        var style1 = styles + '; color:' + txtcolor1;
        var style2 = styles + '; color:' + txtcolor2;
        var styleText = styles + '; color:' + colorForText;
        let t = [] ;  let  specialStyle = [] ; let objects_array = [];
        for (let i = 0; i < 40; i ++){t[i]=''; specialStyle[i]= ''}
        let n = 0;
        args.forEach((a)=>{
            if (a === undefined){a = 'undefined'}
            if (typeof a === 'object' || typeof a === 'function') {objects_array.push(a)  ;return}

            t[n] = '%c'+ a ; n++
            let evl = '%c, ';
            try { if (typeof a === 'number') {throw 'd'}
                evl = '%c = '  + eval(a)+ ', '}
            catch { if (typeof a === 'string' && a !== '') {
                specialStyle[n-1] = styleText;
            } }
            t[n] = evl;
            ;n++
        });
        let fulltxt = t.join('')
        let cssN = n;
        for (let i = 0; i < (cssN); i +=2){
            if (specialStyle[i] === ''){t[i] = style1;} else { t[i] = specialStyle[i]}
            t[i + 1] = style2
        }

        console.group (fulltxt,t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[12],t[14]);
        objects_array.forEach((a)=>{
            let inf = ''
            let stl = ''
            if (Array.isArray(a)){inf = '%c【】%o'; stl = styleText + '; font-size:17px; color: blue'} else
            if (typeof a === 'function'){inf = '%c ➡️ %o'; stl = styleText + '; font-size:14px'} else
            if (typeof a === 'object'){inf = '%c 🅾 %o'; stl = styleText + '; font-size:14px'}



            console.log (inf,stl,a)
        })
        console.groupEnd('');





    }
    function test (typ, num0){
        function cutQuestions (){
            while (G.Q.length > num0 + 1) {
            G.Q.pop()
            }
            G.mgmt.totalNumOfQuestions = G.Q.length - 1


        }
        switch (typ) {
            case 'holo':
            G.divs.ipadContainer.style.top = "10%"
            let fakeevent = {}
            fakeevent.type = "click";
            ledEvent (fakeevent);
            break;
            case 'cutQuestions':
            cutQuestions(); break;
            case "right":
            IpadGrahpic ('right');
            break;

        }

    }
    function Is (obj){

          try {
            let rt = obj instanceof HTMLElement;

            return rt

          }
          catch(e){
            let  rt2 = (typeof obj==='object') &&
              (obj.nodeType===1) && (typeof obj.style === "object") &&
              (typeof obj.ownerDocument ==="object");

              return rt2;
          }
    }
    function Elm(idname, type0){
        let testIt = Id(idname);
        if (Is(testIt)) return testIt;
        type0 = type0 || 'div'
        let newElem = document.createElement(type0);
        newElem.id = idname;
        return newElem

    }
    function Id(TheID){
        return document.getElementById(TheID);
    };
    function stl(p_elem, p_styles, p_styles2 = {}) {
        let x;
        for (x in p_styles) {
            p_elem.style[x] = p_styles[x];
        }
        for (x in p_styles2) {
            p_elem.style[x] = p_styles2[x];
        }
        //p_elem.draggable = false; // maybye cancell ??
        p_elem.onselectstart = function(){ return false };
    }
    function getRandomInt(max) {
        return (Math.floor(Math.random() * Math.floor(max))) + 1
    }
}
function setDirectionBylanguage (element, text) {
    if (text && element) {} else return
    function isHebrew(qtext) {
        if (typeof qtext !== 'string'){return true}
        var hebLetters = /\s?[1234567890אבגדהוזחטיכלמנסעפצקרשתםןץףך]{1,30}\s?/g
        var englishLetters =  /[A-Za-z]{3,30}/g
        let matchArryEnglsh = qtext.match(englishLetters)
        if (matchArryEnglsh === null){matchArryEnglsh = [] }
        let matchArryHebrew = qtext.match(hebLetters)

        if (matchArryHebrew !== null && matchArryHebrew.length >  matchArryEnglsh.length ){ return true} else {return false}

    }
    if (isHebrew(text)) {
        element.style.direction = 'rtl'; element.style.textAlign = 'right'} else {
        {element.style.direction = "ltr"; element.style.textAlign = "left"}
    }

}
function buildWorkSheet (q) {
    const elementOfhtml = (t)=>{
        switch(t){
            case "h_page": return 'h1';
            case "h_text": return 'h2';
            case "h_q": return 'h3';
            case "image_text" : case "image_main": case "image_back": return 'img';
            case "explain" : case "txt":  return 'div';
            default: return 'div'
        }
    }
    const imageIntext = (txt) => {
        const imageInTxtClass = 'image-inside-text'
        const imager = (im) => `&nbsp&nbsp<img id="${'inText_'+im}" class = "${imageInTxtClass}"  src="content/${im}"><span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>`
        regex = /#[\S]{4,37}/gi

        let images = txt.match (regex)
        if (!images) return txt
        images = images.map(e=> e.replace('#',""))

        images.forEach(e=> {
            const imgMU = imager (e)
            txt  = txt.replace('#' + e, imgMU )
        })

        return txt
    }

    class Segment {

        constructor (inf,num) {
             this.number = num;
             this.posNumber = inf[0] ;
             this.treePos = this.posNumber.split('.').map(x=>Number(x)) || false;
             this.typ = inf[2];
             this.content = inf[3];
             this.answer = [inf[4], inf[5],inf[6], inf[7],inf[8],inf[9],inf[10],inf[11]]
             this.sound = inf[12];
             this.solution = inf[13];
             this.bgcolor = inf[14]
             this.elem = elementOfhtml (this.typ)
         };
        segNum () {return  `data-seg="${this.number}"`}
        toMultiInput(){
            const answers =  this.answer.filter((e)=>e)
            let html =''; let slash = '<span style="color:black">/</span>';
            let isSlashin = false;
            const avarageLength = Math.round( JSON.stringify(answers).length/ answers.length)
            if (avarageLength < 17){isSlashin =true }
            answers.forEach(ans=>{

                const numberOfAns = answers.indexOf(ans)
                const ansLbl = "Q" + this.number + "_" + numberOfAns
                const radioClass = "radio2"; let sl = '';
                if ((numberOfAns + 1) < answers.length && isSlashin) {sl = slash} else {sl = ' '}
                let formElm = `<input id = "${ansLbl}" type="radio" class="${radioClass}" name="${"Q" + this.number }" value="${numberOfAns}"> <label class="${radioClass}" for="${ansLbl}">${ans}</label>` + sl


                html += formElm;
            })
            return html

        };
        toCheckboxInput() {
            const svgFun = () => {
                return `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"> <defs id="0">  <linearGradient id="2">   <stop id="9" stop-color="#2e3436"/>   <stop id="A" offset="1" stop-color="#2e3436" stop-opacity="0"/>  </linearGradient>  <linearGradient id="3">   <stop id="B" stop-color="#fff"/>   <stop id="C" offset="1" stop-color="#fff" stop-opacity="0"/>  </linearGradient>  <linearGradient id="4">   <stop id="D" stop-color="#fff" stop-opacity="0.8"/>   <stop id="E" offset="1" stop-color="#fff" stop-opacity="0"/>  </linearGradient>  <radialGradient cx="20.687" cy="46.616" r="12.228" id="5" xlink:href="#2" gradientUnits="userSpaceOnUse" gradientTransform="matrix(0.8204677,0,0,0.1341645,4.4416214,38.87484)"/>  <linearGradient y1="4.55" x2="0" y2="44.23" id="6" xlink:href="#4" gradientUnits="userSpaceOnUse"/>  <linearGradient x1="18.389" y1="-12.905" x2="34.681" y2="29.688" id="7" xlink:href="#3" gradientUnits="userSpaceOnUse"/> </defs> <g id="1">  <g transform="translate(-0.3668551,-1.1036463)" id="8">   <path d="m 31.44716,45.129018 c 0,0.906037 -4.491673,1.640524 -10.032432,1.640524 -5.540759,0 -10.032431,-0.734487 -10.032431,-1.640524 0,-0.906036 4.491672,-1.640523 10.032431,-1.640523 5.540759,0 10.032432,0.734487 10.032432,1.640523 l 0,0 z" id="F" opacity="0.8" fill="url(#5)"/>   <path d="M 37.395259,3.9928032 C 36.751767,3.881258 36.084975,4.1531965 35.70893,4.7391151 L 19.687179,29.697689 11.077028,21.800115 C 10.295804,21.298722 9.2618142,21.512776 8.7604174,22.294002 l -4.4617137,4.963236 c -0.5013867,0.781219 -0.2742552,1.815825 0.5069644,2.317217 0,0 15.6848449,14.93278 15.7046779,14.94441 0.183096,0.117517 0.37856,0.183941 0.579198,0.223816 0.65542,0.130262 1.354145,-0.132654 1.738024,-0.730775 L 44.435002,10.35218 C 44.936393,9.570958 44.709267,8.5363529 43.928039,8.0349601 L 38.026151,4.2321538 C 37.830842,4.1068047 37.609756,4.0299838 37.395259,3.9928032 z" id="G" fill="#8bb300" stroke="#445800" stroke-linejoin="round" stroke-linecap="round" stroke-width="1.061"/>   <path d="m 37,5.09375 c -0.222462,0.068582 -0.368311,0.2935582 -0.6875,0.75 l -8.125,12.71875 -7.25,11.1875 c -0.07531,0.06635 -0.114229,0.155323 -0.15625,0.25 -0.04202,0.09468 -0.09546,0.182583 -0.15625,0.28125 -0.121581,0.197334 -0.311651,0.38921 -0.75,0.46875 -0.306118,0.05555 -0.454585,0.03303 -0.625,-0.0625 -0.170415,-0.09553 -0.338659,-0.262637 -0.65625,-0.5 L 11,23.25 c -0.211436,-0.196035 -0.366685,-0.338043 -0.5,-0.4375 -0.133315,-0.09946 -0.255459,-0.151284 -0.375,-0.15625 -0.119541,-0.005 -0.23023,0.04256 -0.34375,0.125 C 9.66773,22.863687 9.5440059,22.977083 9.375,23.125 l -3.53125,3.84375 c -0.4763125,0.442708 -0.6947169,0.828134 -0.65625,1.21875 0.038467,0.390616 0.3182284,0.733606 0.84375,1.125 0,0 3.557027,3.391995 7.125,6.78125 1.783986,1.694627 3.566493,3.38424 4.90625,4.65625 0.669879,0.636005 1.233193,1.159628 1.625,1.53125 0.195903,0.185811 0.363216,0.337601 0.46875,0.4375 0.05277,0.04995 0.09738,0.09896 0.125,0.125 0.01381,0.01302 0.02395,0.02442 0.03125,0.03125 0.0011,9.44e-4 0.03118,-4.3e-5 0.03125,0 0.08073,0.05181 0.08877,0.0943 0.1875,0.1875 0.09873,0.0932 0.255536,0.234231 0.625,0.53125 0.139903,0.11247 0.326711,0.128203 0.46875,0.0625 0.142039,-0.0657 0.254912,-0.193662 0.375,-0.34375 0.240177,-0.300175 0.448124,-0.693175 0.625,-0.96875 L 43.40625,10.0625 C 43.524201,9.8787288 43.630105,9.7136106 43.6875,9.59375 43.744895,9.4738894 43.775145,9.3861103 43.75,9.28125 43.724855,9.1763897 43.635632,9.0844462 43.53125,9 43.426868,8.9155538 43.309755,8.8373201 43.125,8.71875 c -0.01033,-0.00186 -0.02092,-0.00186 -0.03125,0 L 37.8125,5.4375 C 37.622121,5.3160067 37.502367,5.215151 37.375,5.15625 37.247633,5.097349 37.114744,5.0583758 37,5.09375 z" id="H" opacity="0.8" fill="none" stroke="url(#6)" stroke-linejoin="round" stroke-linecap="round" stroke-width="1.061"/>   <path d="M 36.96875,4.5 C 36.634637,4.5401947 36.326814,4.7168023 36.125,5.03125 L 25.25,21.9375 c 4.538877,-1.517457 9.095334,-2.802858 13.65625,-3.875 l 5.125,-8 c 0.357447,-0.5569403 0.180055,-1.2687651 -0.375,-1.625 L 37.75,4.625 C 37.638068,4.553162 37.498851,4.5323019 37.3125,4.5 37.200153,4.4805254 37.080121,4.4866018 36.96875,4.5 z M 9.875,22.0625 c -0.2851202,0.06083 -0.5453222,0.229783 -0.71875,0.5 C 9.1473,22.58404 9.13686,22.60492 9.125,22.625 l -4.40625,4.90625 c -0.00619,0.0096 0.00588,0.02152 0,0.03125 -0.3339753,0.552285 -0.1704409,1.243682 0.375,1.59375 0.021536,0.0089 0.04242,0.01939 0.0625,0.03125 0,0 0.496977,0.467173 0.53125,0.5 3.0185158,-1.352167 6.036186,-2.634284 9.0625,-3.84375 l -3.96875,-3.625 c -0.0098,-0.0063 -0.02139,0.006 -0.03125,0 -0.279841,-0.169766 -0.58988,-0.217075 -0.875,-0.15625 z" id="I" opacity="0.8" fill="url(#7)" stroke-width="1.061"/>  </g> </g></svg>`
            }
            const answers =  this.answer.filter((e)=>e)
            let html =''; let slash = '<br>';
            let isSlashin = false;
            const avarageLength = Math.round( JSON.stringify(answers).length/ answers.length)
            if (avarageLength < 17){isSlashin =true }
            answers.forEach(ans=>{

                const numberOfAns = answers.indexOf(ans)
                const ansLbl = "Q" + this.number + "_" + numberOfAns
                const radioClass = "checkbox0"; let sl = '';

                const svg2 = svgFun()
                if ((numberOfAns + 1) < answers.length && isSlashin) {sl = slash} else {sl = ' '}
                let formElm = `<br><input id = "${ansLbl}" type="checkbox" class="${radioClass}" name="${"Q" + this.number }" value="${numberOfAns}"> <label class="${radioClass}" for="${ansLbl}"><span class="checksigndecore">${svg2}</span> ${ans}</label>`


                html += formElm;
            })
            return html
        }
        toOrderInput(){
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            let answers =  this.answer.filter((e)=>e)
            let html ='<ol class="orderList">';

            answers = shuffle(answers);
            answers.forEach(ans=>{
                const numberOfAns = answers.indexOf(ans)
                const ansLbl = "Ol" + this.number + "_" + numberOfAns
                const orderClass = "order0"; // draggable="true"
                let formElm = `<li id="${ansLbl}"  class="${orderClass}" > ${ans}</li>`
                html += formElm ;
            })
            return html + '</ol>'

        }
        toWordInput () {
            const textInputClass = 'textInputClass';
            let formElm = `<input id = "${"Q" + this.number}" type="text" class="${textInputClass}" name="${"Q" + this.number }" value="">`
            return formElm
        }
        toImageInput () {
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            let answers =  this.answer.filter((e)=>e);
            let addedStyle = ''; let finaHtml = '';

            const q_image = 'q_image'
            answers = shuffle(answers);
            const numberOfAns = answers.length;
            if (numberOfAns < 4){addedStyle = 'bigquestionimages'}
            answers.forEach (ans=>{
                const numberOfAns = answers.indexOf(ans)
                const ansLbl = "Q" + this.number + "_" + numberOfAns
                let  class0 = 'image-question';

                let imgHtml =  `<img id="ans" class = "${class0} ${addedStyle}"  src="content/${ans.trim()}">`;
                imgHtml = `<input id = "${ansLbl}" type="radio" class="${class0}" name="${"Q" + this.number }" value="${numberOfAns}"> <label class="${class0}" for="${ansLbl}"><img id="ans" class = "${class0} ${addedStyle}"  src="content/${ans.trim()}"></label>`
                finaHtml += imgHtml
            })
            return finaHtml

        }
        toFillbank () {
            let bankDiv = '<div class="word-bank">';
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            let answers =  this.answer.filter((e)=>e)
            answers = shuffle(answers);
            const answerLength = answers.map(a=>a.length)
            const maxLetters = Math.max(...answerLength)
            const spaces = '&nbsp &nbsp &nbsp'
            const seg = this.segNum();
            const segnumber = this.number


            answers.forEach (ans=>{
                const ansLower = ans.toLowerCase()
                bankDiv += `<span id="${'bank_' + ansLower + "_"+ segnumber }" class="" ${seg}>${ans}</span>${spaces}`
            })
            bankDiv += '</div>'


            const content = this.content;
            const txtWithimageMarkup = imageIntext (content)
            let imageInTextClass = ''
            if (content !== txtWithimageMarkup) { imageInTextClass = 'text-containig-images'};
            const rgex = /\$[12346789]/g; let comleteElem = bankDiv;
            let txtArr = txtWithimageMarkup.split(rgex)
            let answersCode = this.content.match(rgex)
            answersCode = answersCode.map(a=>Number(a.replace('$','')))
            const textInputClass = 'textFillInputClass';

            txtArr.forEach (e=>{
                const num = txtArr.indexOf(e) ////
                let input = `<div class="bottom-input-border"><input id = "${"Q" + this.number + "_" + num}" type="text" class="${textInputClass}" name="${"Q" + this.number }" size="${maxLetters}" value="" ${seg}></div>`
                if  (!answers[num]){input = ''}
                let formElm = `<span class="${imageInTextClass}">${e}${input}</span>`
                comleteElem += formElm
            })

            return comleteElem + '<br>';
        }
        toPlaceFromBank () {

            let bankDiv = '<div class="word-place-bank">';
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            let answers =  this.answer.filter((e)=>e)
            answers = shuffle(answers);
            const answerLength = answers.map(a=>a.length)
            const maxLetters = Math.max(...answerLength)
            const spaces = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp';
            const seg = this.segNum();

            answers.forEach (ans=>{
                const ansLower = ans.toLowerCase()
                bankDiv += `<span id="${'placeBank_' + ansLower}" class="place-bank-element" ${seg}>${ans}</span>`
            })
            bankDiv += '</div>';

            const content = this.content;
            const txtWithimageMarkup = imageIntext (content)
            let imageInTextClass = ''
            if (content !== txtWithimageMarkup) { imageInTextClass = 'text-containig-images'};


            const rgex = /\$[12346789]/g; let comleteElem = bankDiv;
            let txtArr = txtWithimageMarkup.split(rgex)
            let answersCode = txtWithimageMarkup.match(rgex)
            answersCode = answersCode.map(a=>Number(a.replace('$','')))
            const placeInputWithBank = 'placeInputWithBank';
            comleteElem += `<div class="InputDropContainer ${imageInTextClass}">`
            txtArr.forEach (e=>{
                const num = txtArr.indexOf(e) ////
                let input = `<div id="dropLocation" class="${placeInputWithBank}" ${seg}>${spaces}</div>`
                if  (!answers[num]){input = ''}
                let formElm = `${e}${input}`
                comleteElem += formElm
            })
            comleteElem += '</div>'

            return comleteElem + '<br>';
        }
        toHtml (){
             let htmlElement = Elm(this.elem);
             let elmType = 'p';
             let elmStyle =''; let srcImg = '';
             let content = this.content;
             let class1 = this.typ
             if (this.typ.includes("image_")){
                 let addedStyle = ''
                 if (this.typ.includes("left")) {
                       addedStyle = "float-left";
                 }
                 else if (this.typ.includes("right")) {
                     addedStyle = `float-right`;
                 } else if (this.typ.includes("main")){
                     addedStyle = `img-main`;
                 }
                let  class0 = 'image_text'
                 content =  `<img class = "${class0} ${addedStyle}"  src="content/${this.content}">`;


             }
             if (this.typ.includes("h_")){
                 let txtWithimageMarkup = imageIntext (content)
                 let imageInTextClass = '';
                 const unerline = '<div class="header-underline"></div>'
                 if (content !== txtWithimageMarkup) {
                     txtWithimageMarkup = txtWithimageMarkup.replace(/&nbsp&nbsp&nbsp/ig,'&nbsp&nbsp');
                     imageInTextClass = 'text-containig-images'};

                 content = `<${this.elem} class="${imageInTextClass }">${txtWithimageMarkup}</${this.elem}>${ unerline}`
             }
             if (this.typ.includes("q_multi")&& this.typ !== "q_word") {
                 const txtWithimageMarkup = imageIntext (content)
                 let imageInTextClass = ''
                 if (content !== txtWithimageMarkup) { imageInTextClass = 'text-containig-images'};
//'<br>' +
                 content =  `<span class="${imageInTextClass}">` + txtWithimageMarkup + '</span>' + this.toMultiInput()  + '<br>';
             }
             if (this.typ === "q_word"){

                 content =  content + this.toWordInput() ;
             }
             if (this.typ === "q_image"){

                 content =  content + '<br>' + this.toImageInput() + `<br>`;
             }
             if (this.typ === "q_order"){
                 content =  content + this.toOrderInput() ;
             }
             if (this.typ === "q_fillbank"){
                 content = this.toFillbank() ;
             }
             if (this.typ === "q_dropbank"){
                 content = this.toPlaceFromBank() ;
             }
             if (this.typ === 'q_checkbox'){
                  content =  '<span>' + content + '</span>' + this.toCheckboxInput()  + '<br>';
             }
             if (this.typ.includes('txt')){
                 const imageMarkup = imageIntext (content)
                 let imageInText = ''
                 if (content !== imageMarkup) { imageInText = 'text-containig-images'}
                 content = `<div class="${this.typ} ${imageInText}"><span>${imageMarkup}</span></div>`;
             }


             //htmlElement = `<${elmType} id= "${"Elm" + this.number}" class="${class1}" ${elmStyle}  ${srcImg}> ${content}</${elmType}>`
             return  content
         }

    }
    for (let i = 1; i < G.Q.length; i++ ) {
        let addPosition = '1'
        if (i>1){addPosition = G.Q[i-1][0]}
        G.Q[i][0] = G.Q[i][0] || addPosition
        G.V[i] = new Segment (G.Q[i],i)
    }
    return G.V

}
function mapPageTree (){
    const deepMapKillLast = (arr)=>{

        const mapped = arr.map(a=>{

            if (Array.isArray(a)){
                if (a.length < 2 && a[0] > 0){

                    return a[0]

                } else return deepMapKillLast(a.filter(()=>true))
            } else if (a > 0) {

                return a
            }
        })

        return mapped
    }
    var m = [];
    var mp;
    for (let i = 1; i < G.V.length ;i++){
         let a = G.V[i].treePos;
        mp = m;
        for (let t = 0; t < a.length;t++) {

            let lv = a[t]

            if (!mp[lv]) {mp[lv] =  []}
            mp = mp[lv]
        }
        mp.push(i)

    }

    m.shift();
    let deep = deepMapKillLast (m)
    return  deep



}
function writePage (html = 'bla') {
    const widthPx = Math.round(screen.width * 0.68);
    const pageMetaContainer = Elm ('pageMetaContainer')
    const pageContainer = Elm ('pageContainer');
    const errorCheck = Id ('ErrorCheck');
    errorCheck.remove ()
    //stl (pageContainer, {position: 'relative', width:"70%", left:"15%"})
    const str = `<form id="mainForm">${html}</form>` //JSON.stringify(html)
    pageContainer.innerHTML = str
    pageContainer.style.width = widthPx + 'px'
    document.body.appendChild(pageMetaContainer);
    pageMetaContainer.appendChild(pageContainer)
}
function writeNavBar () {
    function hovering (ev){
        const nav = Id('navbar');
        if (nav.classList.contains('hovering')) {return};
        nav.classList.add('hovering')
        setTimeout(()=>{nav.classList.remove('hovering')}, 1500)
    }
    const oldSVG = `<svg  width="20" height="20" viewBox="0 0 24 24"><path d="M24 9h-2v-4h-4v-2h6v6zm-6 12v-2h4v-4h2v6h-6zm-18-6h2v4h4v2h-6v-6zm6-12v2h-4v4h-2v-6h6z"/></svg>`;
    const fullScreenSVG = `<svg version="1.1" viewBox="0 0 36 36" class="fullscreen"><g>< xlink:href="#ytp-id-27"></use><path  d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" id="ytp-id-27"></path></g><g><path d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" id="ytp-id-28"></path></g><g><path d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" id="ytp-id-29"></path></g><g ><path class="ytp-svg-fill" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" id="ytp-id-30"></path></g></svg>`
    let html = `עמודים
  <a href="#home"> 1 </a><a href="#home"> 2 </a>
  <a href="#news">תפריט</a>
  <a href="#contact">התקדמות</a>
  <a href="#fullscreen">${fullScreenSVG}&nbsp&nbsp&nbsp&nbsp מסך מלא </a>
`
    const navbarhinter = Elm('navbarhinter');
    const navbar = Elm ('navbar');
    const navbarContatiner = Elm ('navbarContatiner');
    navbarContatiner.addEventListener('mouseover', hovering)
    navbar.innerHTML = html;
    navbarContatiner.appendChild(navbar);
    navbar.appendChild(navbarhinter);
    const pageMetaContainer = Id('pageMetaContainer')
    pageMetaContainer.insertBefore(navbarContatiner, pageMetaContainer.childNodes[0])


}
function buildContent (tree) {


    const rend = h =>{
        let content0 =  h.toHtml()
        return  content0
        //`<${h.elem } class="node" id="${"Wrap"+ h.number}">${content0}</${h.elem }><br>`
    }
    const buildContainer = (arr, level = 0) => {

        let bgstyle = '';
        if (level && G.V[arr[0]].bgcolor){
            bgstyle = `style="background-color:${G.V[arr[0]].bgcolor};"`
        }
        let cont = `<div class="container level${level}" ${bgstyle}>`;
        for (let a = 0; a < arr.length; a++){

            if (Array.isArray(arr[a])){
                cont += buildContainer(arr[a], level+1)
            } else if (level === 0){
                const num = arr[a]
                const html0 = rend(G.V[num])
                cont += `<div class="container level${level+1}" ${bgstyle}>` + html0 + '</div>';

            } else {
                const num = arr[a]
                const html0 = rend(G.V[num])
                cont += html0;
            }


        }

        cont += '</div>';

        return cont

    }
    const fullHtml = buildContainer(tree)
    return fullHtml
}
function setDirection (){
    const mainForm = Id('mainForm');
    const collection = mainForm .querySelectorAll('span, h1, h2, h3, div.txt_instruct');
    collection.forEach (e=>setDirectionBylanguage(e, e.innerHTML))
}
function enableElementPlacing (elemClass_, containerClass_, bankClass = 'word-place-bank'){
    const chooseClass = 'choosen-place-element'
    const activeContainerClass = 'placeInputWithBankReady'
    const elementThatIsplaced = 'place-bank-element-in-container';
    const fakeElementId = 'dupe';
    function clickContainer (ev){
        const createFakeElement = (elme) => {
            const dupe = elme.cloneNode(true)
            dupe.innerHTML =  dupe.innerHTML.replace(/./g , '&nbsp');
            dupe.style.backgroundColor = 'transparent';
            dupe.style.boxShadow = '0 0 0 0';
            dupe.id = dupe.id + fakeElementId;
            return dupe
        }
        if (!ev.target.classList.contains(activeContainerClass)){return}
        let elements = document.getElementsByClassName(chooseClass);
        elements = [...elements];
        if (!elements[0]) {return}
        const wordRect = elements[0].getBoundingClientRect();
        const targetRect = ev.target.getBoundingClientRect();


        elements[0].classList.remove(chooseClass);
        let htm = ev.target.innerHTML;
        htm = htm.replace(/[\s ]+/g, "")
        ev.target.innerHTML = '';
        const parent = elements[0].parentNode
        const dupelicate = createFakeElement (elements[0])
        ev.target.appendChild(elements[0]);
        parent.appendChild(dupelicate)

        const styleOfBankElement = document.querySelector('.place-bank-element');
        const styleOfElementInBank = getComputedStyle(styleOfBankElement);


        elements[0].style.top = wordRect.top - targetRect.top + 'px';
        elements[0].style.left = wordRect.left - targetRect.left + 'px';
        elements[0].style.backgroundColor = styleOfElementInBank.backgroundColor;;
        elements[0].classList.add(elementThatIsplaced);
        setTimeout (()=>{
            elements[0].style.top = '0px';elements[0].style.left = '0px';
            elements[0].style.backgroundColor = ''
        },0)


        containerElements.forEach(e=>e.classList.remove(activeContainerClass))
    }
    function addclickListner (elem) {
        elem.addEventListener('click', chooseElement)
    }
    function chooseElement (ev){
        const seg = ev.target.getAttribute('data-seg')
        L(seg)
        if (ev.target.classList.contains(elementThatIsplaced)){
            const previosParent = ev.target.parentNode;
            let dupe = Id(ev.target.id + fakeElementId)
            document.getElementsByClassName(bankClass)[0].appendChild(ev.target);
            if(dupe) {dupe.remove(); dupe = null;}
            ev.target.style.opacity = '0'
            setTimeout(()=>{ev.target.style.opacity = '1'},1)
            ev.target.classList.remove (elementThatIsplaced);
            ev.target.classList.remove (chooseClass);
            ev.target.classList.remove (activeContainerClass);
            containerElements.forEach(e=>e.classList.remove(activeContainerClass));
            [...elements].forEach(e=>e.classList.remove(chooseClass));
            previosParent.innerHTML = '&nbsp&nbsp&nbsp&nbsp&nbsp'
            return;

        }
        if (ev.target.classList.contains(chooseClass)){
            ev.target.classList.remove(chooseClass)
            containerElements.forEach(e=>e.classList.remove(activeContainerClass))
        } else {
            let elements = document.getElementsByClassName(elemClass_);
            elements = [...elements];
            elements.forEach(e=>e.classList.remove(chooseClass))
            let emptyContainerElements = containerElements.filter(e=>
                {const res = e.getElementsByClassName(elemClass_)
                    if (e.getAttribute('data-seg') !== seg) {
                        e.classList.remove(activeContainerClass)
                        return false
                    }
                    return !res[0]
                }
            )
            emptyContainerElements.forEach(e=>{e.classList.add(activeContainerClass);

            })
            ev.target.classList.add(chooseClass)

        }

    }

    const elements = document.getElementsByClassName(elemClass_);
    var containerElements = document.getElementsByClassName(containerClass_);
    containerElements = [...containerElements];
    containerElements.forEach(e=>e.addEventListener('click',clickContainer))
    Array.prototype.map.call(elements, (list) => {addclickListner(list)});
}
function enableDragSort(listClass) {
    function enableDragList(list) {
      Array.prototype.map.call(list.children, (item) => {enableDragItem(item)});
    }
    function enableDragItem(item) {
      item.setAttribute('draggable', true)
      item.ondrag = handleDrag;
      item.ondragstart = onDragStart
      item.ondragend = handleDrop;
      item.ondragover = onDragOver
    }
    function onDragStart (item){

        item.dataTransfer.dropEffect= "link";
        item.dataTransfer.setData("link", item.target.id);

    }
    function onDragOver(item){
        let target = item.target;
        item.preventDefault();
        item.dataTransfer.dropEffect= "link";

    }
    function handleDrag(item) {
      const selectedItem = item.target,
            list = selectedItem.parentNode,
            x = event.clientX,
            y = event.clientY;





      selectedItem.classList.add('drag-sort-active');
      let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

      if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
      }
    }
    function handleDrop(item) {
      item.target.classList.remove('drag-sort-active');
    }
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {enableDragList(list)});
}
function addListnerToBank (listClass){
    const dataAtr = 'data-wordBank';
    function changeBank (el, reverse = false){
        el.classList.remove('wordBank-delete-striked-out')
        el.classList.add('wordBank-striked-out');

        if (reverse){el.classList.remove('wordBank-striked-out');
        el.classList.add('wordBank-delete-striked-out')
    }

    }
    function addFocusListner (item){

        item.addEventListener('focusout',focusOut);
    }
    function focusOut (item){
        const text = item.target.value.trim().toLowerCase();
        const seg = item.target.getAttribute('data-seg')
        let elem = Id('bank_' + text + "_" + seg )

        if (elem) {
            changeBank  (elem)
            item.target.setAttribute(dataAtr , text) ;

        } else if (item.target.hasAttribute(dataAtr)) {
            const lastWord = item.target.getAttribute(dataAtr);
            item.target.removeAttribute(dataAtr)
            let elem1 = Id('bank_' + lastWord + "_" + seg );
            let allElements = document.getElementsByClassName(listClass);
            allElements = [...allElements];
            if (allElements.some(e=>e.value.trim().toLowerCase() === lastWord)){
                }else {
                changeBank (elem1, true);
            }
        }
    }
    const bankLists = document.getElementsByClassName(listClass);
    Array.prototype.map.call(bankLists, (list) => {addFocusListner(list)});
}


const virt = buildWorkSheet ();
const tree = mapPageTree ()
const cont = buildContent (tree);
const final = cont

writePage ( final )
setDirection ()
enableDragSort('orderList');
addListnerToBank('textFillInputClass')
enableElementPlacing ('place-bank-element', 'placeInputWithBank')
writeNavBar ()

//things to add: after in-text images add spaces acording to width relation;
