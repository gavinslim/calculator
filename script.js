var display_str = "";   // Frontend display string
var first_op = "";      // First operand
var sec_op = "";        // Second operand
var calc_str = "";      // Intermediate string for calculation
var sum_val = "";       // Final value for sum

let operator_pressed = false;
let digit_pressed = false;

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

function calculate_sum() {
    display_str.split(' ').forEach(element => {
        console.log(element);
    });
}

function display_digit() {
    display_str = display_str.concat(this.innerHTML);
    top_screen.innerHTML = display_str;
    
    digit_pressed = true;
    console.log("digit: " + digit_pressed);

    // Check for display overflow and adjust font size
    adjust_display();    
}

// Operator functions
function display_operator() {
    const selection = this.innerHTML;
    
    // Clear and reset
    if (selection == "C") {
        display_str = "";
        top_screen.innerHTML = display_str;  
        main_screen.innerHTML = display_str;
        first_op = display_str;
        sec_op = display_str;
        operator_pressed = false;
        digit_pressed = false;
        top_screen.style.fontSize = "70px";
        return;
    
    // Delete (Consider white spaces for operators)
    } else if (selection == "del") {
        display_str = display_str.slice(-1) == ' ' ? display_str.slice(0, -3) : display_str.slice(0, -1);
        top_screen.innerHTML = display_str;  
        return;
    
    // Sum
    } else if (selection == "=") {
        console.log("Operator: " + operator_pressed + " | " + "Digit: " + digit_pressed);
        if (!operator_pressed) {
            main_screen.innerHTML = display_str;
        } else {
            if (!digit_pressed) {return}
            calculate_sum();
        }
        operator_pressed = false;
        return;
    } 

    if (!digit_pressed) {return}

    // Rest of op
    if (!operator_pressed) {
        
        // If operator pressed for the first time, 
        // save first operand
        first_op = display_str;
        display_str = display_str.concat(selection);
        top_screen.innerHTML = display_str;

        operator_pressed = true;
        digit_pressed = false;

        console.log("operator: " + operator_pressed);

        // Check for display overflow and adjust font size
        adjust_display();
    } 
}

// Adjust fontsize of main display to prevent overflow
function adjust_display() {
    // Check for display overflow and adjust font size
    if (top_screen.scrollWidth > top_screen.clientWidth) {
        var font_size = window.getComputedStyle(top_screen, null).getPropertyValue('font-size');
        top_screen.style.fontSize = (parseInt(font_size) * 0.7) + "px";
    }
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
