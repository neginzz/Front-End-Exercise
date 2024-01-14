let buffer = "0";
let total = 0;
let prevopt = null;
const forTextbox = document.querySelectorAll(".btn-num, .btn-opt:not(.btn-eq)");
const allBtn = document.querySelectorAll(".btn");
const txtSet = document.querySelector(".txt-input");
// const operation= document.querySelectorAll(".btn-opt");

for (const item of allBtn) {
  item.addEventListener("click", function (event) {
    let inside = event.target.innerHTML;

    if (event.target.classList.contains("btn-num")) {
      // console.log("number:", inside);

      buffer = inside;
      if (txtSet.value === "0") {
        txtSet.value = buffer;
      } else {
        txtSet.value += buffer;
      }
    } else if (event.target.classList.contains("btn-c")) {
      buffer = 0;
      txtSet.value = buffer;
    } else if (event.target.classList.contains("btn-del")) {
      if (txtSet.value.length === 1) {
        txtSet.value = "0";
      } else {
        txtSet.value = txtSet.value.substring(0, txtSet.value.length - 1);
      }
    } else if (event.target.classList.contains("btn-eq")) {
      if (prevopt === null) {
        return;
      } else {
        compute(parseInt(txtSet.value));
        prevopt = null;
        txtSet.value = "" + total;
        total = 0;
      }
    } else {
      // console.log(txtSet.value, inside);
      calculate(txtSet.value, inside);
    }
  });
}

function calculate(num, opt) {
  if (num === "0") {
    return;
  }
  const intNum = parseInt(num);
  if (total === 0) {
    total = intNum;
  } else {
    compute(intNum);
  }

  prevopt = opt;
  txtSet.value = "0";
  // console.log(total);
}

function compute(num) {
  switch (prevopt) {
    case "÷":
      total /= num;
      break;
    case "x":
      total *= num;
      break;
    case "-":
      total -= num;
      break;
    case "+":
      total += num;
      break;
    default:
      console.log("not valid");
  }
}
