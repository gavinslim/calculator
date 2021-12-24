var curr_string = "";
var first_operand = "";
var sec_operand = "";

let operator_pressed = true;

var top_screen = document.getElementById('top-screen');
var main_screen = document.getElementById('main-screen');

function add(a, b) {return a - b;}
function sub(a, b) {return a - b;}
function mul(a, b) {return a * b;}
function div(a, b) {return a / b;}
function neg(a) {return -1 * a;}

function operate(op, a, b) {
    if (op == "add") {return add(a, b);}
    if (op == "sub") {return sub(a, b);}
    if (op == "mul") {return mul(a, b);}
    if (op == "div") {return div(a, b);}
    if (op == "neg") {return neg(a);}
}

function update_curr_string(str) {
    console.log(str);
}

function display_digit() {
    curr_string = curr_string.concat(this.innerHTML);
    top_screen.innerHTML = curr_string;
    operator_pressed = false;

    // Check for display overflow and adjust font size
    if (top_screen.scrollWidth > top_screen.clientWidth) {
        var font_size = window.getComputedStyle(top_screen, null).getPropertyValue('font-size');
        top_screen.style.fontSize = (parseInt(font_size) * 0.7) + "px";
    }
    
}

// Operator functions
function display_operator() {
    const selection = this.innerHTML;
    
    // Clear entire top display
    if (selection == "C") {
        curr_string = "";
        top_screen.innerHTML = curr_string;  
        
        // Reset font-size
        top_screen.style.fontSize = "70px";
        return;
    
    // Delete last character. Consider white spaces for operators
    } else if (selection == "del") {
        curr_string = curr_string.slice(-1) == ' ' ? curr_string.slice(0, -3) : curr_string.slice(0, -1);
        top_screen.innerHTML = curr_string;  
        return;
    }

    // Display operator in top display
    if (!operator_pressed) {
        const first_operand = curr_string;
        curr_string = curr_string.concat(selection);
        top_screen.innerHTML = curr_string;

        operator_pressed = true;

        // Check for display overflow and adjust font size
        if (top_screen.scrollWidth > top_screen.clientWidth) {
            var font_size = window.getComputedStyle(top_screen, null).getPropertyValue('font-size');
            top_screen.style.fontSize = (parseInt(font_size) * 0.7) + "px";
        }
    }
}

function display_sum() {
    // Split current string
    console.log(curr_string.split(' '));
}

// Init buttons
const buttons = document.querySelectorAll('.digit');
buttons.forEach(button => {
    button.addEventListener('click', display_digit, false);
});

const operators = document.querySelectorAll('.function');
operators.forEach(operator => {
    operator.addEventListener('click', display_operator, false);
});

const sum = document.querySelector('.sum').addEventListener('click', display_sum);