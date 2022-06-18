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

for(let i=0; i < buttons.length;i++) {
    buttons[i].addEventListener('click', (event) => {
        event.preventDefault();

        if(buttons[i].innerText == "=") {
            resultSection.value = eval(resultSection.value)
            action = 'calculation-done'
        } else if(buttons[i].innerText == "Reset") {
            resultSection.value = ""
        } else if(buttons[i].innerText == "Del") {
            if(action == 'inserting') {
                resultSection.value = resultSection.value.substr(0, resultSection.value.length-1);
            } else {
                resultSection.value = ""
            }
        } else {
            resultSection.value += buttons[i].innerText;
            action = 'inserting'
        }
    })
}