const API = "https://api.quotable.io/random?maxLength=80";
var quote = {
    text: "bibbity_bobbity",
    author: "Huffman",
    table: null
};

const STR_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Solicitamos una frase a la API
requestQuote = async () => await fetch(API).then(data => data.json());

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Al presionar submit
loadTree = async () => {
    let _quote = await requestQuote().then(obj => obj).catch(err => console.log(err));
    quote.author = _quote.author;
    quote.table = getFrequencyTable(quote.upper_text = (quote.text = _quote.content).toUpperCase());
    quote.huffman = {};
    quote.huffman.tree = HuffmanTree.createHuffmanTree(quote.table);
    quote.huffman.user_tree = HuffmanTree.createHuffmanTree(quote.table);
    quote.huffman.str = quote.huffman.tree.encrypt(quote.upper_text);
    quote.huffman.dummy_dictionary = {};

    quote.discovered_letters = [];
    for (const [key, value] of Object.entries(quote.huffman.tree.getDictionary())){
        if(STR_LETTERS.indexOf(key) == -1){
            quote.discovered_letters.push({v: key, special: true});
        }else if(Math.random() > .6){
            quote.discovered_letters.push({v: key, special: false});
        }
    }
    quote.letters_state = "";
    let changed;
    for (let i = 0; i < quote.upper_text.length; i++) {
        const element = quote.upper_text[i];
        changed = false;
        for (let j = 0; j < quote.discovered_letters.length; j++) {
            if(element == quote.discovered_letters[j].v){
                if(quote.discovered_letters[j].special){
                    quote.letters_state += "+";
                }else{
                    quote.letters_state += "-";
                }
                changed = true;
            }
        }
        if(!changed) {
            quote.letters_state += "*";
        }
    }

    let letters = STR_LETTERS;
    for (const [key, value] of Object.entries(quote.huffman.tree.getDictionary())){
        if(STR_LETTERS.indexOf(key) > -1){
            const letter = letters.charAt(Math.floor(getRandomArbitrary(0, letters.length)));

            letters = letters.replace(letter, "");
            quote.huffman.dummy_dictionary[letter] = value;
            continue;
        }
        quote.huffman.dummy_dictionary[key] = value;
    }
    quote.dummy_text = quote.huffman.tree.separate(quote.huffman.str);
    dummy_entries = Object.entries(quote.huffman.dummy_dictionary);
    quote.dummy_text = quote.dummy_text.reduce((prev, current) => prev + dummy_entries.find(p => p[1] == current)[0], "");
    for (const [key, value] of Object.entries(quote.huffman.tree.getDictionary())){
        if(STR_LETTERS.indexOf(key) > -1){
            quote.huffman.user_tree.setDictionaryValue(value, " ");
            continue;
        }
    }
}; 

// Creamos la tabla de ocurrencias/frecuencias
var getFrequencyTable = (text) => {
    let ocurrences = text.split('').reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr].freq : acc[curr] = {'letter': curr, 'freq': 1}, acc
    }, {});
    return Object.keys(ocurrences).map(k => ocurrences[k]);
}