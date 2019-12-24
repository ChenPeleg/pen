function setDirectionBylanguage(element, text) {
    if (text && element) { }
    else
        return;
    function isHebrew(qtext) {
        if (typeof qtext !== 'string') {
            return false;
        }
        var hebLetters = /\s?[אבגדהוזחטיכלמנסעפצקרשתםןץףך]{1,30}\s?/g;
        var englishLetters = /[A-Za-z]{3,30}/g;
        let matchArryEnglsh = qtext.match(englishLetters);
        if (matchArryEnglsh === null) {
            matchArryEnglsh = [];
        }
        let matchArryHebrew = qtext.match(hebLetters);
        if (matchArryHebrew !== null && matchArryHebrew.length > matchArryEnglsh.length) {
            return true;
        }
        else {
            return false;
        }
    }
    if (isHebrew(text)) {
        element.style.direction = 'rtl';
        element.style.textAlign = 'right';
    }
    else {
        //{element.style.direction = "ltr"; element.style.textAlign = "left"}
    }
}
