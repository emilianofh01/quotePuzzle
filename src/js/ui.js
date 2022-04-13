function reloadInputValues() {
    let quote_str = quote.huffman.user_tree.decrypt(quote.huffman.str);
    $('[letter-index]').forEach(e => {
        if ($(e).attr('letter-use') == 'innerHTML') {
            $(e).html(quote_str[$(e).attr('letter-index')]);
        } else if ($(e).attr('letter-use') == 'value') {
            e.value = quote_str[$(e).attr('letter-index')];
        }
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
            html += `<div class="letter_input" dummy-letter="${element_dummy}"><input maxlength="1" type="text" name="" id="letterInput" dummy-letter=${element_dummy} letter-index=${index} letter-use="value"></div>`
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
            event.target.value = key;
            event.preventDefault();
            shiftTo(event.target, 1);
        }
        event.preventDefault();
    });
    console.log($("#letterInput"));
    $("#letterInput").on('input', function (event) {
        console.log("Hola")
        if(event.target.value != quote.huffman.user_tree.decode(quote.huffman.user_tree.separate(quote.huffman.str)[$(event.target).attr("letter-index")])) {
            quote.huffman.user_tree.setDictionaryValue(quote.huffman.user_tree.separate(quote.huffman.str)[$(event.target).attr("letter-index")], key < 32 ? '' : key);
            reloadInputValues();
        }
    })
    $("#letterInput").on('focus', function (event) {
        $("#letterInput").removeClass('selected');
        $(`#letterInput[dummy-letter=${$(event.target).attr('dummy-letter')}]`).addClass('selected');
    });
    $("#letterInput").on('blur', function (event) {
        $(`#letterInput[dummy-letter=${$(event.target).attr('dummy-letter')}]`).removeClass('selected');
    });
}

$(window).ready(async () => {
    await loadTree();
    load_inputs();
})