// Esta clase tuve que ponerla en español porque entraba en conflicto con otra 
class Nodo { 
    constructor(letter, freq, left_node = null, right_node = null) {
        this.letter = letter ? letter : null;
        this.freq = freq ? freq : null;

        this.left = left_node;
        this.right = right_node;
    }

    setLeftNode     = node => this.left   = node;
    setRightNode    = node => this.right  = node;
    setValue        = value => this.letter  = value;

    getLeftNode     = () => this.left;
    getRightNode    = () => this.right;
    getValue        = () => this.letter;

    hasLeftNode     = () => this.left != null && this.left != undefined;
    hasRightNode    = () => this.right != null && this.right != undefined;
    hasValue        = () => this.letter != null && this.letter != undefined;
    isLeaf          = () => !this.hasLeftNode() && !this.hasRightNode();

    popRightNode    = () => { let aux = this.getRightNode(); this.setRightNode(null); return aux; };
    popLeftNode    = () => { let aux = this.getLeftNode(); this.getLeftNode(null); return aux; };

    static joinNodes = (nodeA, nodeB) => new Nodo(null, nodeA.freq + nodeB.freq, nodeA, nodeB);

}
