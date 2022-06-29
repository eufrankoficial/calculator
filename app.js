let numbers = document.querySelectorAll('.number');

let display = document.querySelector('.display');
let output = document.querySelector('.output');
let clear = document.querySelector('.clear');
let backspace = document.querySelector('.backspace');
let operators = document.querySelectorAll('.operator');
let equal = document.querySelector('.equal');
let percent = document.querySelector('.percent');


const operations = ['x', '+', '-', '÷'];

function returnFormattedExpression(expression) {
  let formattedExpression = expression.replace('x', '*');
  formattedExpression = formattedExpression.replace('÷', '/');
  
  return formattedExpression;
}

percent.addEventListener('click', () => {
  const displayValue = display.textContent;
  output.textContent = displayValue / 100;
  display.textContent = output.textContent;
});

equal.addEventListener('click', () => {
  let expression = prepareToOperation(display.textContent)
  output.textContent = operation(expression);
  display.textContent = output.textContent;
});


function prepareToOperation(text) {
  return returnFormattedExpression(text);
}

const operation = (exp) => {
  return new Function(`return ${exp}`)();
};

operators.forEach((operator) => {
  operator.addEventListener('click', (element) => {
    
    if (display.textContent == "") {
      return false;
    }

    const lastCaracter = display.textContent.slice(display.textContent.length - 1);
    
    if (operations.includes(lastCaracter)) {
      display.textContent = "I got you!";
      
      setTimeout(clearDisplay, 2000);

      return false;
    }

    display.append(element.target.textContent);
  });
});

backspace.addEventListener('click', () => {
  if (display.textContent !== "") {
    display.textContent = display.textContent.slice(0, -1);
  }
});

clear.addEventListener('click', clearDisplay)

numbers.forEach((number) => {
  number.addEventListener('click', (element) => {
    let value = element.target.textContent;
      
    if (display.textContent !== "") {
      display.append(value);
    } else {
      display.textContent = value;
    }

    if ("0123456789.+-×÷".includes(display.textContent[display.textContent.length - 1])) {
      output.textContent = operation(prepareToOperation(display.textContent));
    }
  });
});


function clearDisplay() {
  display.textContent = '';
  output.textContent = '';
}
