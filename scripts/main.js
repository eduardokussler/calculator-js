

function setUpNumbersEventListener() {
  let input = document.querySelector('input');
  let numbers = document.querySelectorAll('.numbers');
  numbers.forEach((element) => {
    element.addEventListener('click', (e) => {
      input.value += e.target.innerText;
    })
  })
}

function clearEverything(){
  let input = document.querySelector('input');
  input.value = '';
}

function setUpCE() {
  let ceButton = document.querySelector('#CE');
  ceButton.addEventListener('click', () => {
    clearEverything();
  });
}

function setUpOperatorsEventListener() {
  let input = document.querySelector('input');
  let operators = document.querySelectorAll('.operations');
  operators.forEach((element) => {
    element.addEventListener('click', (e) => {
      input.value += ` ${e.target.value} `
    });
  })
}

function setUpEquals() {
  let equals = document.querySelector('#equals');
  let input = document.querySelector('input');
  equals.addEventListener('click', () => {
    let result = handleInputValue(input.value);
    input.value = String(result);
  });
}

function handleInputValue(expression) {
  expression = expression.trim();
  expression = Array.from(expression);
  let calculation = {
    firstNum: undefined,
    secondNum: 0,
    operation: "+",
  }
  let nextSpaceAfterSecondNum = 0;
  let lastResult = 0;
  do {
    let firstSpace = expression.indexOf(' ');
    let nextSpace = expression.indexOf(' ', firstSpace+1);
    nextSpaceAfterSecondNum = expression.indexOf(' ', nextSpace+1);
    if(calculation.firstNum === undefined) {
      calculation.firstNum = Number(expression.slice(0, firstSpace).join(''));
    } else {
      calculation.firstNum = lastResult;
    }
    
    calculation.operation = expression.slice(firstSpace+1, nextSpace);
    calculation.operation = calculation.operation[0];
    if(nextSpaceAfterSecondNum === -1) {
      calculation.secondNum = Number(expression.slice(nextSpace+1).join(''));
    } else {
      expression.slice(nextSpace+1, nextSpaceAfterSecondNum);
      calculation.secondNum = Number(expression.slice(nextSpace+1, nextSpaceAfterSecondNum).join(''));
    }
    expression.splice(0, nextSpaceAfterSecondNum);
    lastResult = operate(calculation.firstNum, calculation.secondNum, calculation.operation);
  } while (nextSpaceAfterSecondNum != -1);
  return lastResult;
}

function operate(firstNum, secondNum, op) {
  if(op === '+') {
    return firstNum + secondNum;
  }
  if (op === '-') {
    return firstNum - secondNum;
  }

  if(op === '*') {
    return firstNum * secondNum;
  }
  if(op === '/') {
    return firstNum / secondNum
  }

  throw Error;
}

function setUpBackspace() {
  let backspace = document.querySelector('#backspace');
  let input = document.querySelector('input');
  backspace.addEventListener('click', () => {
    let inputValue = Array.from(input.value);
    inputValue.pop();
    input.value = inputValue.join('');
  })
}

setUpNumbersEventListener();
setUpCE();
setUpOperatorsEventListener();
setUpEquals();
setUpBackspace();