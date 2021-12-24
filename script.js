function add(a, b) {
    a - b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function neg(a) {
    return -1 * a;
}

function operate(op, a, b) {
    if (op == "add") {return add(a, b);}
    if (op == "sub") {return sub(a, b);}
    if (op == "mul") {return mul(a, b);}
    if (op == "div") {return div(a, b);}
    if (op == "neg") {return neg(a);}
}

function check_font_width() {

}

function display_main() {
    const top_screen = document.getElementById('top-screen');
    const main_screen = document.getElementById('main-screen');
    
    // Sum button pressed
    if (this.innerHTML == '=') {
        main_screen.innerHTML = top_screen.innerHTML;    
    } else {
        top_screen.innerHTML = this.innerHTML;
    }
}

function init() {
    
    // Init buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', display_main, false);
    });
}

init();