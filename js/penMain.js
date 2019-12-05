
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
             this.elem = elementOfhtml (this.typ)
         };
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
        toFillbank () {
            let bankDiv = '<div class="word-bank">';
            const shuffle = (array) => array.sort(() => Math.random() - 0.5);
            let answers =  this.answer.filter((e)=>e)
            answers = shuffle(answers);
            const answerLength = answers.map(a=>a.length)
            const maxLetters = Math.max(...answerLength)
            const spaces = '&nbsp &nbsp &nbsp'
            answers.forEach (ans=>{
                const ansLower = ans.toLowerCase()
                bankDiv += `<span id="${'bank_' + ansLower}" class="">${ans}</span>${spaces}`
            })
            bankDiv += '</div>'

            const rgex = /\$[12346789]/g; let comleteElem = bankDiv;
            let txtArr = this.content.split(rgex)
            let answersCode = this.content.match(rgex)
            answersCode = answersCode.map(a=>Number(a.replace('$','')))
            const textInputClass = 'textFillInputClass';

            txtArr.forEach (e=>{
                const num = txtArr.indexOf(e) ////
                let input = `<div class="bottom-input-border"><input id = "${"Q" + this.number + "_" + num}" type="text" class="${textInputClass}" name="${"Q" + this.number }" size="${maxLetters}" value=""></div>`
                if  (!answers[num]){input = ''}
                let formElm = `${e}${input}`
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
            answers.forEach (ans=>{
                const ansLower = ans.toLowerCase()
                bankDiv += `<span id="${'bank_' + ansLower}" class="place-bank-element">${ans}</span>`
            })
            bankDiv += '</div>';

            const rgex = /\$[12346789]/g; let comleteElem = bankDiv;
            let txtArr = this.content.split(rgex)
            let answersCode = this.content.match(rgex)
            answersCode = answersCode.map(a=>Number(a.replace('$','')))
            const placeInputWithBank = 'placeInputWithBank';
            comleteElem += '<div class="InputDropContainer">'
            txtArr.forEach (e=>{
                const num = txtArr.indexOf(e) ////
                let input = `<div id="dropLocation" class="${placeInputWithBank}">${spaces}</div>`
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
             if (this.typ.includes("image")){
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
                 content = `<${this.elem}>${content}</${this.elem}>`
             }
             if (this.typ.includes("q_multi")&& this.typ !== "q_word") {
//'<br>' +
                 content =  '<span>' + content + '</span>' + this.toMultiInput()  + '<br>';
             }
             if (this.typ === "q_word"){
                 //'<br>' +
                 content =  content + this.toWordInput() ;
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
             if (this.typ.includes('txt')){
                 content = `<div class="${this.typ}"><span>${ content}</span></div>`;
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
    const pageContainer = Elm ('pageContainer');
    const errorCheck = Id ('ErrorCheck');
    errorCheck.remove ()
    stl (pageContainer, {position: 'relative', width:"70%", left:"15%"})
    const str = `<form id="mainForm">${html}</form>` //JSON.stringify(html)
    pageContainer.innerHTML = str
    document.body.appendChild(pageContainer);
}
function buildContent (tree) {


    const rend = h =>{
        let content0 =  h.toHtml()
        return  content0
        //`<${h.elem } class="node" id="${"Wrap"+ h.number}">${content0}</${h.elem }><br>`
    }
    const buildContainer = (arr, level = 0) => {
        let cont = `<div class="container level${level}">`;
        for (let a = 0; a < arr.length; a++){

            if (Array.isArray(arr[a])){
                cont += buildContainer(arr[a], level+1)
            } else{
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
function enableElementPlacing (class_){
    function enableDrop (item){
        item.style.background = 'red';
        item.ondragover = onDragOver;
        item.ondrop = onDropEvent;
    }
    function onDropEvent (item) {
        item.preventDefault();
        item.dataTransfer.dropEffect = "link";
        let data = item.dataTransfer.getData("link");

    }
    //
    function onDragOver (item){
        let target = item.target;
        item.preventDefault();
        item.dataTransfer.dropEffect = "link";
        item.dataTransfer.setData("link", target.id)

    }
    const elements = document.getElementsByClassName(class_);
     Array.prototype.map.call(elements, (list) => {enableDrop(list)});
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
        //item.preventDefault();
        item.dataTransfer.dropEffect= "link";
        item.dataTransfer.setData("link", item.target.id);
        L(item.dataTransfer);
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
        let elem = Id('bank_' + text)

        if (elem) {
            changeBank  (elem)
            item.target.setAttribute(dataAtr , text) ;

        } else if (item.target.hasAttribute(dataAtr)) {
            const lastWord = item.target.getAttribute(dataAtr);
            item.target.removeAttribute(dataAtr)
            let elem1 = Id('bank_' + lastWord);
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
enableDragSort('word-place-bank');
addListnerToBank('textFillInputClass')
enableElementPlacing ('placeInputWithBank')

//
