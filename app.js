let numbers = document.querySelectorAll('.number');

let display = document.querySelector('.display');
let output = document.querySelector('.output');

let clear = document.querySelector('.clear');
let backspace = document.querySelector('.backspace');
let operators = document.querySelectorAll('.operator');
let equal = document.querySelector('.equal');
let percent = document.querySelector('.percent');
let dot = document.querySelector('.dot');

const caracteres = ['x', '+', '-', '÷', '.', 'N'];

const returnFormattedExpression = (expression) => {
  let formattedExpression = expression.replace('x', '*');
  formattedExpression = formattedExpression.replace('÷', '/');
  
  return formattedExpression;
}

const setDisplayContentText = (text) => {
  display.textContent = text;
}

const clearDisplay = () => {
  display.textContent = '';
}

const clearOutput = () => {
  output.textContent = '';
}

const setOutputContentText = (text) => {
  output.textContent = text;
}

const checkDisplayExpression = () => {
  if (!isDisplayContentNotEmpty()) {
    return false;
  }

  if (!checkIfLastCaracterIsAnOperationOrDot()) {
    return true;
  }

  return false;
}

const checkIfCanDoOperation = () => {
  return "0123456789.+-×÷".includes(display.textContent[display.textContent.length - 1]);
}

const isDisplayContentNotEmpty = () => {
  return display.textContent.trim() !== '' ? true : false;
}

function prepareToOperation(text) {
  return returnFormattedExpression(text);
}

const operation = (exp) => {
  return new Function(`return ${exp}`)();
};

const checkIfLastCaracterIsAnOperationOrDot = () => {
  const lastCaracter = display.textContent.slice(display.textContent.length - 1);
    
  if (caracteres.includes(lastCaracter)) {
    setDisplayContentText("N/N");

    return true;
  }

  return false;
}

dot.addEventListener('click', () => {
  if(!checkIfLastCaracterIsAnOperationOrDot())
    display.textContent = display.textContent + '.';
  
  return false;
});

percent.addEventListener('click', () => {
  const displayValue = display.textContent;
  
  const result = operation(displayValue / 100);

  setDisplayContentText(result);
  setOutputContentText(result);
});

equal.addEventListener('click', () => {
  if (checkIfCanDoOperation()) {
    const result = operation(prepareToOperation(display.textContent));
    setOutputContentText(
      0
    );
    setDisplayContentText(
      result
    )
  }
});

operators.forEach((operator) => {
  operator.addEventListener('click', (element) => {
    
    if (!isDisplayContentNotEmpty() || checkIfLastCaracterIsAnOperationOrDot()) {
      return false;
    }
    
    display.append(element.target.textContent);
  });
});


backspace.addEventListener('click', () => {
  if (isDisplayContentNotEmpty()) {
    setDisplayContentText(display.textContent.slice(0, -1));
  }
});

clear.addEventListener('click', clearDisplay)

numbers.forEach((number) => {
  number.addEventListener('click', (element) => {
    let value = element.target.textContent;
      
    if (isDisplayContentNotEmpty()) {
      display.append(value);
    } else {
      setDisplayContentText(value);
    }

    if (checkIfCanDoOperation()) {
      setOutputContentText(operation(prepareToOperation(display.textContent)));
    }
  });
});

