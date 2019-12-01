
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
        p_elem.draggable = false; // maybye cancell ??
        p_elem.onselectstart = function(){ return false };
    }
    function getRandomInt(max) {
        return (Math.floor(Math.random() * Math.floor(max))) + 1
    }
}
function buildVirtualDom (q) {
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
             this.posNumber = inf[0];
             this.treePos = this.posNumber.split('.').map(x=>Number(x)) || false;
             this.typ = inf[2];
             this.content = inf[3];
             this.answer = [inf[4], inf[5],inf[6], inf[7],inf[8],inf[9]]
             this.sound = inf[10];
             this.solution = inf[11];
             this.elem = elementOfhtml (this.typ)
         };
        toForm(){
            const answers =  this.answer.filter((e)=>e)

            let html =''
            answers.forEach(ans=>{

                const numberOfAns = answers.indexOf(ans)
                const ansLbl = "Q" + this.number + "_" + numberOfAns
                let formElm = `<input id = "${ansLbl}" type="radio" class="radio1" name="${"Q" + this.number }" value="${numberOfAns}"> <label class="radio1" for="${ansLbl}">${ans}</label> <br>`


                html += formElm;
            })

            return html

        };
         toHtml (){
             let htmlElement = Elm(this.elem);
             let elmType = 'p';
             let elmStyle =''; let srcImg = '';
             let content = this.content;
             let class1 = this.typ
             if (this.typ.includes("image")){
                 elmType = 'img' ; content = ``;
                 srcImg = `src="content/${this.content}"`

                 elmType = 'div';
                 content =  `<img class = "${this.typ}" src="content/${this.content}">`;
                 class1 = '';
                 elmStyle = `style="width: 220px;"`
             }
             if (this.typ.includes("h_")){
                 content = `<${this.elem}>${content}</${this.elem}>`
             }
             if (this.typ.includes("q_")) {
                 content += this.toForm()
             }

             //htmlElement = `<${elmType} id= "${"Elm" + this.number}" class="${class1}" ${elmStyle}  ${srcImg}> ${content}</${elmType}>`
             return  content;
         }

    }
    for (let i = 1; i < G.Q.length; i++ ) {
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
    const str = `<form>${html}</form>` //JSON.stringify(html)
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


const virt = buildVirtualDom ();
const tree =mapPageTree ()
const cont = buildContent (tree);
const final = cont

writePage ( final )
