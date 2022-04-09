$(window).ready(async () => {
    await loadTree();
    let isInWord = false;
    let html = "";
    let quote_str = quote.huffman.tree.decrypt(quote.huffman.str);
    for (let index = 0; index < quote_str; index++) {
        const element = quote_str[index];
        const element_type = quote.letters_state[index];
        const element_dummy = quote.dummy_text[index];
        if(element != ' ' && !isInWord){
            isInWord = true;
            html += "<div>"
        }
        if(element == ' ' && isInWord){
            isInWord = false;
            html += "</div>"
        }
        if(element_type == '*'){
            html += `<div class="letter_input" dummy-letter="${element_dummy}"><input maxlength="1" type="text" name="" id="letterInput" letter-index=${index}></div>`
        }else{
            html += `<div class="fixedChar-container"><p class="fixedChar" letter-index=${index}>${element}</p></div>`
        }
    }
    $("#wordsInputContainer").html(html);
    $("#letterInput").on('keypress', function(event){
        let key;
        if (window.event) {
            key = event.keyCode;
        } else if (event.which) {
            key = event.which;
        }
        key = String.fromCharCode(key).toUpperCase();
        if(STR_LETTERS.indexOf(key) > -1){
            event.target.value = key;
        }
        event.preventDefault();
    });
})
