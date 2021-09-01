var solved = false;
var ope = false;
function math(expression)
{
    let result = document.getElementById("result");
    let input = document.getElementById("input");
    switch(expression){
        case "%":
                result.innerHTML = result.innerHTML / 100;
            break;
        case "CE":
            result.innerHTML = "0";
            if(solved){
                input.innerHTML = "";
            }
            break;
        case "C":
            result.innerHTML = "0";
            input.innerHTML = "";
            break;
        case "Backspace":
            let re = result.innerHTML;
            let le = re.length;
            if(le > 1) {
                re = re.slice(0, le - 1);
                result.innerHTML = re;
            }
            else if(le == 1) {
                result.innerHTML = 0;
            }
            break;
        case "/":
            operator(" / ", result, input);
            break;
        case "X":
            operator(" * ", result, input);
            break;
        case "-":
            operator(" - ", result, input);
            break;
        case "+":
            operator(" + ", result, input);
            break;
        case "=":
            calculate(result, input);
            break;
        case ",":
            displayNumber('.', result);
            break;
        case "+/-":
            //TODO
            break;
        case "9":
            displayNumber(9, result);
            break;
        case "8":
            displayNumber(8, result);
            break;
        case "7":
            displayNumber(7, result);
            break;
        case "6":
            displayNumber(6, result);
            break;
        case "5":
            displayNumber(5, result);
            break;
        case "4":
            displayNumber(4, result);
            break;
        case "3":
            displayNumber(3, result);
            break;
        case "2":
            displayNumber(2, result);
            break;
        case "1":
            displayNumber(1, result);
            break;
        case "0":
            displayNumber(0, result);
            break;
        case "Test":
            break;
        default:
            console.log("error1")
    }
}

function operator(operator, result, input){
    if(ope){
        let inp = input.innerHTML;
        let le = inp.length;
        inp = inp.slice(0, le - 3);
        inp = inp + operator;
        input.innerHTML = inp;
    }
    else{
        if (solved){
            input.innerHTML = result.innerHTML + operator;
            result.innerHTML = 0;
            solved = false;
            ope = true;
        }
        else{
            input.innerHTML += result.innerHTML + operator;
            result.innerHTML = 0;
            solved = false;
            ope = true;
        }
    }
}

function displayNumber(number, result){
    ope = false;
    let prev;
    if(result.innerHTML == "0" && number != "."){
        solved = false;
        prev = number;
    }
    else if(solved == true){
        document.getElementById("input").innerHTML = "";
        solved = false;
        prev = number;
    }
    else{
        prev = result.innerHTML;
        prev += number;
    }
    result.innerHTML = prev;
}
function calculate(result, input){
    if(!solved){
        console.log("solve")
        input.innerHTML += result.innerHTML;
        let array = input.innerHTML.split(" ");
        //document.getElementById("test").innerHTML = array.toString();
        array = prio(array);
        if(!solved){
        array = normal(array);
        result.innerHTML = array[0];
        //input.innerHTML = "";
        }
        solved = true;
        ope = false;
    }
}

function normal(array){
        while(array.length > 1){
            if(array[1] == "+"){
                console.log("addition")
                let res = Number(array[0]) + Number(array[2]);
                array.splice(0, 3, res);
            }
            else{
                console.log("subtraction")
                let res = Number(array[0]) - Number(array[2]);
                array.splice(0, 3, res);
            }
        }
        return array;
}

function prio(array){
    let mul = array.indexOf("*");
    let div = array.indexOf("/");
    console.log(mul, div);
    if((mul < div && mul > -1) || (div < 0 && mul > -1)){
        //multiplikation
        console.log("multiplikation");
        let res = array[mul - 1] * array[mul + 1];
        array.splice(mul - 1, 3, res);
        return prio(array);
    }
    else if(div > -1){
        //division
        if(array[div + 1] == 0){
            divZero();
        }
        else{
        let res = array[div - 1] / array[div + 1];
        console.log("division");
        array.splice(div - 1, 3, res);
        return prio(array);
        }
    }
    else{
        // no mul or div left
        return array;
    }
}

function divZero(){
    let result = document.getElementById("result");
    let input = document.getElementById("input");
    input.innerHTML="";
    result.innerHTML="Cannot divide by zero";
    solved = true;
}

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(button){
    switch(button.keyCode){
        case 49:
            math("1");
            break;
        case 97:
            math("1");
            break;
        case 50:
            math("2");
            break;
        case 98:
            math("2");
            break;
        case 51:
            math("3");
            break;
        case 99:
            math("3");
            break;
        case 52:
            math("4");
            break;
        case 100:
            math("4");
            break;
        case 53:
            math("5");
            break;
        case 101:
            math("5");
            break;
        case 54:
            math("6");
            break;
        case 102:
            math("6");
            break;
        case 55:
            math("7");
            break;
        case 103:
            math("7");
            break;
        case 56:
            math("8");
            break;
        case 104:
            math("8");
            break;
        case 57:
            math("9");
            break;
        case 105:
            math("9");
            break;
        case 48:
            math("0");
            break;
        case 96:
            math("0");
            break;
        case 188:
            math(",");
            break;
        case 110:
            math(",");
            break;
        case 13:
            math("=");
            break;
        case 187:
            math("+");
            break;
        case 107:
            math("+");
            break;
        case 189:
            math("-");
            break;
        case 109:
            math("-");
            break;
        case 106:
            math("X");
            break;
        case 111:
            math("/");
            break;
    }
}