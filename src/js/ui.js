function reloadInputValues() {
    let quote_str = quote.huffman.user_tree.decrypt(quote.huffman.str);
    $('#letterInput').forEach(e => {
        if (STR_LETTERS.indexOf(quote_str[$(e).attr('letter-index')]) < 0) {
            e.value = '';
            return;
        }
        e.value = quote_str[$(e).attr('letter-index')];
    });

}

function load_inputs() {
    let isInWord = false;
    let html = "";
    $("#quoteAuthor").html(quote.author);
    let quote_str = quote.huffman.tree.decrypt(quote.huffman.str);
    for (let index = 0; index < quote_str.length; index++) {
        const element = quote_str[index];
        const element_type = quote.letters_state[index];
        const element_dummy = quote.dummy_text[index];
        if (element != ' ' && !isInWord) {
            isInWord = true;
            html += "<div>"
        }
        if (element == ' ' && isInWord) {
            isInWord = false;
            html += "</div>"
        }
        if (element_type == '*') {
            html += `<div class="letter_input" dummy-letter="${element_dummy}"><input autocomplete="off" maxlength="1" type="text" name="" class="letterInput" id="letterInput" dummy-letter=${element_dummy} letter-index=${index} letter-use="value"></div>`
        } else {
            html += `<div class="fixedChar-container"><p class="fixedChar" letter-index=${index} letter-use="innerHTML">${element}</p></div>`
        }
    }

    $("#wordsInputContainer").html(html);
    let sortedInputs_array = [];
    $("#letterInput").forEach((e) => {
        sortedInputs_array.push(e);
    })

    let shiftTo = (target, to) => {
        let letter = $(target).attr('letter-index');
        for (let index = Math.min(sortedInputs_array.length - 1, letter); index >= 0; index--) {
            if ($(sortedInputs_array[index]).attr('letter-index') == letter && sortedInputs_array[index + to]) {
                sortedInputs_array[index + to].focus();
                return sortedInputs_array[index + to];
            }
        }
    }

    $("#letterInput").on('keydown', function (event) {
        let key;
        if (window.event) {
            key = event.keyCode;
        } else if (event.which) {
            key = event.which;
        }
        if (key == 8 && event.target.value.length < 1) {
            event.preventDefault();
            let e;
            (e = shiftTo(event.target, -1)) && (e.value = '');
            quote.huffman.user_tree.setDictionaryValue(quote.huffman.user_tree.separate(quote.huffman.str)[$(e).attr("letter-index")], ' ');
            reloadInputValues();
        }
        if (key == 37) {
            shiftTo(event.target, -1);
        }
        if (key == 39) {
            shiftTo(event.target, 1);
        }
        
    })

    $("#letterInput").on('keypress', function (event) {
        let key;
        if (window.event) {
            key = event.keyCode;
        } else if (event.which) {
            key = event.which;
        }

        key = String.fromCharCode(key).toUpperCase();
        if (STR_LETTERS.indexOf(key) > -1) {
            event.keyCode = key.charCodeAt(0);
            return true;
        }
        
        event.preventDefault();
        
    });

    validateQuote = () => {
        if(quote.huffman.tree.decrypt(quote.huffman.str) === quote.huffman.user_tree.decrypt(quote.huffman.str)) {
            $("#letterInput").forEach(input => input.disabled = true);     
            $(".letter_input").forEach(input => input.classList.add('winner'))
            $(".btn_try-again").forEach(input => {
                input.style.display = 'unset'
                input.addEventListener('animationend', () => input.addEventListener('click', () => {
                    $(".frame")[0].classList.remove("start")
                    setTimeout(() => {
                        input.style.display = 'none';
                        $(".frame")[0].classList.add("start");
                    }, 2000);
                    setTimeout(() => {
                        startGame(); 
                    }, 1000)                  
                }))
            })
        }
    }

    $("#letterInput").on('input', function (event) {
        let { value } = event.target;

        if (value.length < 1) {
            value = ' ';
        }
        value = event.target.value = value.toUpperCase();
        quote.huffman.user_tree.setDictionaryValue(quote.huffman.user_tree.separate(quote.huffman.str)[$(event.target).attr("letter-index")], value);
        reloadInputValues();
        validateQuote();
        shiftTo(event.target, 1);
    })
    $("#letterInput").on('focus', function (event) {
        $("#letterInput").removeClass('selected');
        $(`#letterInput[dummy-letter=${$(event.target).attr('dummy-letter')}]`).addClass('selected');
    });
    $("#letterInput").on('blur', function (event) {
        $(`#letterInput[dummy-letter=${$(event.target).attr('dummy-letter')}]`).removeClass('selected');
    });

}

startGame = async () => {
    await loadTree();
    load_inputs();
}

$(window).ready( () => {
    startGame();
})