class HuffmanTree {
    constructor(root){
        this.root = root;
    }

    getDictionary = () => {
        let getDictionaryNode;
        getDictionaryNode = (node, dict, str) => {
            if(node.isLeaf()){
                dict[node.getValue()] = str;
            }
            if(node.hasLeftNode()){
                getDictionaryNode(node.getLeftNode(), dict, str + "0")
            }
            if(node.hasRightNode()){
                getDictionaryNode(node.getRightNode(), dict, str + "1")
            }
        }
        let dict = {}
        getDictionaryNode(this.root, dict, "");
        return dict;
    }

    decrypt = (str) => {
        let decryptRecursive;
        decryptRecursive = (root, node, str, i, r_str) => {            
            if(node.isLeaf()){
                r_str += node.getValue();
                if(i >= str.length){
                    return r_str;
                }
                return decryptRecursive(root, root, str, i, r_str);
            }
            
            if(i >= str.length){
                return r_str;
            }

            if(str[i] == '0'){
                return decryptRecursive(root, node.getLeftNode(), str, ++i, r_str);
            }

            if(str[i] == '1'){
                return decryptRecursive(root, node.getRightNode(), str, ++i, r_str);
            }

            return r_str;
        }
        return decryptRecursive(this.root, this.root, str, 0, "");
    }

    separate = (str) => {
        let decryptRecursive;
        decryptRecursive = (root, node, str, i, r_str, j) => {            
            if(node.isLeaf()){
                if(i >= str.length){
                    return r_str;
                }else{
                    r_str[++j] = "";
                }
                return decryptRecursive(root, root, str, i, r_str, j);
            }

            if(i >= str.length){
                return r_str;
            }

            if(str[i] == '0'){
                r_str[j] += '0';
                return decryptRecursive(root, node.getLeftNode(), str, ++i, r_str, j);
            }

            if(str[i] == '1'){
                r_str[j] += '1';
                return decryptRecursive(root, node.getRightNode(), str, ++i, r_str, j);
            }

            return r_str;
        }
        return decryptRecursive(this.root, this.root, str, 0, [""], 0);
    }

    encrypt = (str) => {
        let dict = this.getDictionary();
        let r_str = "";
        for (let index = 0; index < str.length; index++) {
            r_str += dict[str[index]] || "";
        }
        return r_str;
    }

    static createHuffmanTree(_list) {
        let list = new LinkedList(_list.map(e => new Nodo(e.letter, e.freq)));
        let last_nodes = [];
        let minor, mayor;
        while(list.root && list.root.next){
            let n = 0;
            list.sort((v1, v2) => v1.freq < v2.freq);
            list.removeAll((e, i) => {
                if(i > list.length - 3){
                    last_nodes[n++] = e;
                    return true;
                }
                return false;
            });
            if(last_nodes[0].isLeaf() || (!last_nodes[1].isLeaf() && last_nodes[1].freq < last_nodes[0].freq)){
                list.push(Nodo.joinNodes(last_nodes[0], last_nodes[1]));
                continue;
            }
            list.push(Nodo.joinNodes(last_nodes[1], last_nodes[0]));
        }
        return new HuffmanTree(list.root.value);
    }
}