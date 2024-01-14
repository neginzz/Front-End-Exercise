
const forTextbox =document.querySelectorAll(".btn-num, .btn-opt:not(.btn-eq)");
const allBtn=document.querySelectorAll(".btn");
// const txtSet=document.querySelector(".txt-input");
// const operation= document.querySelectorAll(".btn-opt");

for(const item of forTextbox){
 item.addEventListener("click", function (event) {
  document.querySelector(".txt-input").value = event.target.innerHTML;});
};

for(const item of allBtn){
  item.addEventListener("click", function (event) {
    if(event.target.classList.contains('btn-num')){
      console.log('number:', event.target.innerHTML);
    }
    else{
      console.log('symbol',event.target.innerHTML);
    }
 })};


// 
 

 





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

// console.log(calculate(1,2,'+'));