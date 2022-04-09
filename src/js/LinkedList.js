
class LinkedListNode{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(arr){
        this.root = null;
        this.length = 0;
        if(arr){
            this.pushArray(arr);
        }
    }

    // Funcion para recorrer el arreglo
    forEach = (fn) => {
        let i = 0;
        let element = this.root;
        while(element){
            fn(element.value, i++);
            element = element.next;
        }
    }
    
    removeIf = (fn) => {
        let i = 0;
        let last_elem = null;
        let element = this.root;
        while(element){
            if(fn(element.value, i++)){
                this.length--;
                if(!last_elem){
                    this.root = element.next;
                    element = this.root;
                    break;
                }
                last_elem.next = element.next;
                element = last_elem.next;
                break;
            }
            last_elem = element;
            element = element.next;
        }
    }

    // Funcion para borrar todos los elementos que cumplen con una condicion
    removeAll = (fn) => {
        let i = 0;
        let last_elem = null;
        let element = this.root;
        while(element){
            if(fn(element.value, i++)){
                this.length--;
                if(!last_elem){
                    this.root = element.next;
                    element = this.root;
                    continue;
                }
                last_elem.next = element.next;
                element = last_elem.next;
                continue;
            }
            last_elem = element;
            element = element.next;
        }
    }

    pushArray = (arr) => {
        arr.forEach(e => {
            this.push(e);
        })
    }

    push = (value) => {
        this.length++;
        if(this.root == null){
            this.root = new LinkedListNode(value);
            return;
        }
        let element = this.root;
        while(element.next){
            element = element.next;
        }
        element.next = new LinkedListNode(value);
    }

    sort = (fn) => {
        for (let i = 0; i < this.length; i++) {
            let element = this.root;
            let isSorted = true;
            if(!element){
                return;
            }
            while(element.next){
                if(fn(element.value, element.next.value) != 0){
                    isSorted = element.value;
                    element.value = element.next.value;
                    element.next.value = isSorted;
                    isSorted = false;
                }
                element = element.next;
            }
            if(isSorted){
                return;
            }
        }
    }

}