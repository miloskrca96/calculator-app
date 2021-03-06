const options = document.querySelectorAll('.option__wrapper')[0];
const currentTheme = document.querySelectorAll('.selected__theme-inner')[0];
const buttons = document.querySelectorAll('.btn');
const resultSection = document.querySelectorAll('.numbers__input')[0];

let currentHash = new URL(document.URL);


if (currentHash.hash !== "") {
    document.body.setAttribute('class', currentHash.hash.substring(1));
    currentTheme.setAttribute('class', `selected__theme-inner ${currentHash.hash.substring(1)}`);
}

for(let i=0; i < options.childElementCount; i++) {
    options.children[i].addEventListener('click', () => {
        if(options.children[i].innerText == '1') {
            currentTheme.setAttribute('class', 'selected__theme-inner theme1');
            document.body.setAttribute('class', 'theme1');
            currentHash.hash = '#theme1';
        } else if(options.children[i].innerText == '2') {
            currentTheme.setAttribute('class', 'selected__theme-inner theme2');
            document.body.setAttribute('class', 'theme2');
            currentHash.hash = '#theme2';
        } else if(options.children[i].innerText == '3') {
            currentTheme.setAttribute('class', 'selected__theme-inner theme3');
            document.body.setAttribute('class', 'theme3');
            currentHash.hash = '#theme3';
        }
        
        const new_url = currentHash.href;
        document.location.href = new_url
    })
}


let action = ''
repetitionStack = []

for(let i=0; i < buttons.length;i++) {
    buttons[i].addEventListener('click', (event) => {
        event.preventDefault();

        if(buttons[i].innerText == "=") {
            let values = [] 
            let ops = []
            let tokens = resultSection.value;
            action = 'calculation-done'
         
            for(let i=0; i < tokens.length; i++) {
                if((tokens[i] >= '0' && tokens[i] <= '9') || tokens[i] == '.'){
                    let val = 0;
                    var decimal = false
                    divisor = 10
                    while(i < tokens.length && ((tokens[i] >= '0' && tokens[i] <= '9') || tokens[i] == '.')) {
                        if (tokens[i] == '.') {
                            decimal = true
                            i++;
                        }

                        if(!decimal) {
                            val = (val*10) + (tokens[i]-'0');
                        } else {
                            val = val + (tokens[i]-'0') / divisor
                            divisor *= 10
                        }
                        
                        i++;
                    }
                     
                    values.push(val);
                    i--;
                } else {
                    while(ops.length != 0 && precedence(ops[ops.length-1]) >= precedence(tokens[i])) {
                        const val2 = values.pop();
                        const val1 =  values.pop();
                        const op = ops.pop();
                       
                        
                        values.push(applyOperation(val1, val2, op));
                    }
                    ops.push(tokens[i]);
                }
            }

            while(ops.length != 0){
                const val2 = values.pop();           
                const val1 = values.pop();        
                const op = ops.pop();
                         
                values.push(applyOperation(val1, val2, op));
            }

            let result = values[values.length-1];
            resultSection.value = result;
          
        } else if(buttons[i].innerText == "Reset") {
            resultSection.value = ""
        } else if(buttons[i].innerText == "Del") {
            if(action == 'inserting') {
                resultSection.value = resultSection.value.substr(0, resultSection.value.length-1);
                repetitionStack.pop();
            } else {
                resultSection.value = ""
            }
        } else {
            if(buttons[i].innerText == '-' || buttons[i].innerText == '*' || buttons[i].innerText == '+' || buttons[i].innerText == '/' || buttons[i].innerText == '.') {
                if(repetitionStack.length == 0) {
                    addToRepetitionStack(buttons[i].innerText)
                    action = 'inserting'
                } else {
                    let topElem = repetitionStack[repetitionStack.length - 1]

                    if(topElem != buttons[i].innerText && notSign(topElem)) {
                        addToRepetitionStack(buttons[i].innerText)
                        action = 'inserting'
                    }
                }
            } else {
                addToRepetitionStack(buttons[i].innerText)
                action = 'inserting'
            } 
        }
    })
}


//HELPER FUNCTIONS
function precedence(op){
    if(op == '+'||op == '-')
        return 1;
    if(op == '*'||op == '/')
        return 2;
    return 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}

function applyOperation(a, b, op){
    let result
    a = (a === undefined) ? 0 : a;
    b = (b === undefined) ? 0 : b;
    
    switch(op){
        case '+': { result =  a + b; break; }
        case '-': { result = a - b; break; }
        case '*': { result = a * b; break; }
        case '/': { result = a / b; break; }
    }

    result = isFloat(result) ? result.toFixed(2) : result;

    return result
}

function notSign(elem) {
    if(elem == '.' || elem == '+' || elem == '/' || elem == '-' || elem == '*') {
        return false
    }

    return true
}

function addToRepetitionStack(val) {
    resultSection.value += val;
    repetitionStack.push(val)
}