class Selector{
    constructor (selector, context){
        if (context == undefined){
            context = rootSelector;
        }
        if(selector === undefined){
            this.length = 1;
            this[0] = context;
            return;
        }
        if(selector.nodeType !== undefined || selector === window){
            this.length = 1;
            this[0] = selector;
            return;
        }
        if(typeof selector === "string"){
            var es = context.querySelectorAll(selector);
            let l = this.length = es.length;
            for (let i = 0; i < l; i++) {
                this[i] = es[i];
            }
            return;
        }
        throw new Error("Only valid elements and selectors");
    }

    on(event, f, options) {
        if(typeof f !== "function"){
            throw new Error("The argument f must be a function");
        }
        for (let index = 0; index < this.length; index++) {
            this[index].addEventListener(event, f, options);
        }
    }

    forEach(f){
        if(typeof f !== "function"){
            throw new Error("The argument f must be a function");
        }
        for (let i = 0; i < this.length; i++) {
            f(this[i], i);
        }
    }

    ready(f){
        console.log('readyf')
        this.on( "load", f );
    }

    remove(){
        this.forEach(e => e.remove());
    }

    inserAfter(element){
        if(typeof element === 'string'){
            this.insertAfter(new DOMParser().parseFromString(element, "text/html").body.childNodes);
            return;
        }
        if(Symbol.iterator in element){
            for (let i = element.length - 1; i >= 0; i--) {
                let elem = element[i];
                this.inserAfter(elem);
            }
            return;
        }
        if(this.length > 1){
            console.warn("Try not to use this when there are many elements of the same type");
            this.forEach(e => e.parentNode.insertBefore(element.cloneNode(), e.nextSibling));
        }else if(this.length === 1){
            console.log(element);
            this[0].parentNode.insertBefore(element, this[0].nextSibling);
        }
    }

    insertEnd(element){
        if(typeof element === 'string'){
            this.insertEnd(new DOMParser().parseFromString(element, "text/html").body.childNodes);
            return;
        }
        if(Symbol.iterator in element){
            for (let i = 0; i < element.length; i++) {
                let elem = element[i];
                this.insertEnd(elem);
            }
            return;
        }
        if(this.length > 1){
            console.warn("Try not to use this when there are many elements of the same type");
            this.forEach(e => e.appendChild(element.cloneNode()));
        }else if(this.length === 1){
            console.log(element);
            this[0].parentNode.appendChild(element);
        }
    }

    replace(element){
        if(typeof element === 'string'){
            element = new DOMParser().parseFromString(element, "text/html");
            this.replace(element.body.childNodes);
        }else if(Symbol.iterator in element){
            let elemStr = false;
            for (let i = element.length - 1; i >= 0; i--) {
                let elem = element[i];
                if(typeof elem === "string"){
                    element[i] = new DOMParser().parseFromString(elem, "text/html").body.childNodes;
                    elemStr = true;
                }else{
                    this.inserAfter(elem);
                }
            }
            elemStr ? this.replace(element) : this.remove();
        }else if(element.nodeType === 1 || element.nodeType === 9){
            this.inserAfter(element);
            this.remove();
        }else{
            console.log(element);
            throw new Error("Wrong element parameter");
        }
    }

    html(html){
        if(html === undefined){
            return this.length == 0 ? '' : this[0].innerHTML;
        }
        this.forEach(e => e.innerHTML = html);
    }

    toggleClass(clazz){
        this.forEach(e => e.classList.toggle(clazz));
    }

    addClass(clazz){
        this.forEach(e => e.classList.add(clazz));
    }

    removeClass(clazz){
        this.forEach(e => e.classList.remove(clazz));
    }
}


var $ = (selector, context) => {
    if(typeof selector === "function"){
        $.ready(selector);
        return;
    }
    return new Selector(selector, context);
}

$.ready = (f) => $(window).ready(f);

var $1 = function (selector, context){
    if(context == undefined){
        context = rootSelector;
    }
    return context.querySelector(selector)
}

var rootSelector = document;