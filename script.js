var display_str = "";   // Frontend display string
var first_op = "";      // First operand
var sec_op = "";        // Second operand
var calc_str = "";      // Intermediate string for calculation
var sum_val = "";       // Final value for sum

var top_screen = document.getElementById('top-screen');
var result_screen = document.getElementById('result-screen');

var op_pressed = false;
var decimal_pressed = false;
const op_array = new Set(['+', '-', '÷', 'x', '+/-', '%']);


function add(a, b) {return a + b;}
function sub(a, b) {return a - b;}
function mul(a, b) {return a * b;}
function div(a, b) {return a / b;}
function neg(a) {return -1 * a;}
function mod(a, b) {return a % b;}

function operate(a, op, b) {
    if (op == '+') {return add(a, b);}
    if (op == '-') {return sub(a, b);}
    if (op == 'x') {return mul(a, b);}
    if (op == '÷') {return div(a, b);}
    if (op == '+/-') {return neg(a);}
    if (op == '%') {return mod(a, b);}
}

// Recursive calculation 
function calculate(arr) {

    // Find first operand and check if it exists in op_array
    let operand = arr.find(element => op_array.has(element));
    if (operand == undefined) {
        return arr;
    } 

    // Calculate
    const index = arr.indexOf(operand);
    const a = parseFloat(arr[index-1]);
    const b = parseFloat(arr[index+1]);
    let result = operate(a, operand, b);

    console.log(a + ' ' + operand + ' ' + b + ' = ' + result);

    // Remove operand combo
    arr.splice(index-1, 3);
    arr.splice(0, 0, result);

    return calculate(arr);
}

function toggle(arr) {
    let val = neg(parseFloat(arr[arr.length - 1]));
    arr.splice(arr.length - 1, 1, val);
    return arr;
}

function display_digit() {
    const selection = this.innerHTML;

    if (selection == '.') {
        if (decimal_pressed) {return;}
        else {decimal_pressed = true;}
    }

    display_str = display_str.concat(selection);
    top_screen.innerHTML = display_str;
    op_pressed = false;

    // Check for display overflow and adjust font size
    check_display(); 

}

// Operator functions
function display_operator() {
    const selection = this.innerHTML;
    decimal_pressed = false;

    if (top_screen.innerHTML == '') {return;}    

    // Clear and reset
    if (selection == "C") {
        display_str = "";
        top_screen.innerHTML = display_str;  
        result_screen.innerHTML = display_str;
        first_op = display_str;
        sec_op = display_str;
        operator_pressed = false;
        decimal_pressed = false;

        let docStyle = getComputedStyle(document.documentElement);
        top_screen.style.fontSize = docStyle.getPropertyValue('--top-fontsize');
    
    // Delete (Consider white spaces for operators)
    } else if (selection == "del") {

        // Delete negative number
        if (display_str.slice(-2) < 0) {
            display_str = display_str.slice(0, -1);
        }

        // Remove operator or last digit
        display_str = display_str.slice(-1) == ' ' ? display_str.slice(0, -3) : display_str.slice(0, -1);
            
        top_screen.innerHTML = display_str;  
    
    // Sum
    } else if (selection == "=") {
        if (op_pressed) {return;}
        let value = parseFloat(calculate(display_str.split(' ')))

        // Check if value has decimal places
        if (value % 1 != 0) {
            result_screen.innerHTML = value.toFixed(5);
        } else {
            result_screen.innerHTML = value;
        }

    // 
    } else if (selection == '+/-') {
        if (op_pressed) {return;}
        display_str = toggle(display_str.split(' ')).join(" ");
        top_screen.innerHTML = display_str;

    } else {
        if (op_pressed) {return;}
        display_str = display_str.concat(selection);   
        top_screen.innerHTML = display_str;   
        op_pressed = true;

        check_display();
    }
}

// Adjust fontsize of main display to prevent overflow
function check_display() {
    var font_size = parseInt(window.getComputedStyle(top_screen, null).getPropertyValue('font-size'));
    if (font_size < 35) {
        return;
    }

    // Check for display overflow and adjust font size
    if (top_screen.scrollWidth > top_screen.clientWidth) {
        top_screen.style.fontSize = (font_size * 0.7) + "px";
    }
}

// Register keydown events
function keyboard(e) {
    const button = document.querySelector(`.btn[data-key="${e.key}"]`);
    if (!button) return;
    button.click();
    check_display();
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

window.addEventListener('keydown', keyboard);