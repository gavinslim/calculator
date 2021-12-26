var display_str = "";   // Frontend display string
var first_op = "";      // First operand
var sec_op = "";        // Second operand
var calc_str = "";      // Intermediate string for calculation
var sum_val = "";       // Final value for sum

var top_screen = document.getElementById('top-screen');
var result_screen = document.getElementById('result-screen');

var op_pressed = false;
const op_array = new Set(['+', '-', '÷', 'x']);


function add(a, b) {return a - b;}
function sub(a, b) {return a - b;}
function mul(a, b) {return a * b;}
function div(a, b) {return a / b;}
function neg(a) {return -1 * a;}

function operate(a, op, b) {
    if (op == '+') {return add(a, b);}
    if (op == '-') {return sub(a, b);}
    if (op == 'x') {return mul(a, b);}
    if (op == '÷') {return div(a, b);}
    if (op == "neg") {return neg(a);}
}

function calculate_sum() {
    const arr = display_str.split(' ');    

    const operand = arr.find(element => op_array.has(element));
    // const index = arr.findIndex(element => element == operand);
    const index = arr.indexOf(operand);
    const a = arr[index-1];
    const b = arr[index+1];

    // console.log('a: ' + a + ' | ' + 'b: ' + b + ' | ' + 'op: ' + operand);
    
    const result = operate(a, operand, b);
    result_screen.innerHTML = result;

    // display_str.split(' ').forEach(element => {
    //     console.log(element);
    // });
}

function display_digit() {
    display_str = display_str.concat(this.innerHTML);
    top_screen.innerHTML = display_str;
    op_pressed = false;

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
        result_screen.innerHTML = display_str;
        first_op = display_str;
        sec_op = display_str;
        operator_pressed = false;
        digit_pressed = false;
        top_screen.style.fontSize = "70px";
    
    // Delete (Consider white spaces for operators)
    } else if (selection == "del") {
        display_str = display_str.slice(-1) == ' ' ? display_str.slice(0, -3) : display_str.slice(0, -1);
        top_screen.innerHTML = display_str;  
    
    // Sum
    } else if (selection == "=") {
        if (op_pressed) {return;}
        calculate_sum();

    } else {
        if (op_pressed) {return;}
        display_str = display_str.concat(selection);      
        op_pressed = true;
    }

    top_screen.innerHTML = display_str;
    adjust_display();
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
