function calculate(num1, num2, opt) {
  let result = 0;
  switch (opt) {
    case "÷":
      result = num1 / num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "+":
      result = num1 + num2;
      break;
    default:
        console.log('not valid');
  }
  return result;
}

console.log(calculate(1,2,'+'));