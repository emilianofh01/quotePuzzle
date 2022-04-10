$(window).ready(async () => {
    await loadTree();
    let isInWord = false;
    let html = "";
    let quote_str = quote.huffman.tree.decrypt(quote.huffman.str);
    for (let index = 0; index < quote_str.length; index++) {
        console.log("hola")
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
    let sortedInputs_array = [];
    $("#letterInput").forEach((e) => {
        sortedInputs_array.push(e);
    })
    $("#letterInput").on('keydown', function(event){
        let key;
        if (window.event) {
            key = event.keyCode;
        } else if (event.which) {
            key = event.which;
        }
        if(key == 8 && event.target.value.length < 1){
            event.preventDefault();
            let letter = $(event.target).attr('letter-index');
            for (let index = Math.min(sortedInputs_array.length - 1, letter); index >= 0; index--) {
                if($(sortedInputs_array[index]).attr('letter-index') == letter && sortedInputs_array[index - 1]){
                    sortedInputs_array[index - 1].value = '';
                    sortedInputs_array[index - 1].focus();
                    break;
                }
            }
        }
        
    })
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
            event.preventDefault();
            let letter = $(event.target).attr('letter-index');
            for (let index = Math.min(sortedInputs_array.length - 1, letter); index >= 0; index--) {
                if($(sortedInputs_array[index]).attr('letter-index') == letter && sortedInputs_array[index + 1]){
                    sortedInputs_array[index + 1].focus();
                    break;
                }
            }
        }
        event.preventDefault();
    });
})
