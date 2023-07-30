const $input = document.querySelectorAll("input");

function GreatestCommonFactor() {
  const Number1 = Number($input[0].value);
  const Number2 = Number($input[1].value);

  const Result = [];
  let count = 1;
  while (true) {
    if (Number1 % count === 0 && Number2 % count === 0) {
      Result.push(count);
    }
    if (Number1 === count || Number2 === count) {
      break;
    }
    count++;
  }
  const $h1 = document.querySelector("h1");
  $h1.innerText = Result[Result.length - 1];
}

function LeastCommonMultiple() {
  const Number1 = Number($input[0].value);
  const Number2 = Number($input[1].value);
  let count = 1;
  while (true) {
    if (count % Number1 === 0 && count % Number2 === 0) {
      break;
    }
    count++;
  }
  const $h1 = document.querySelector("h1");
  $h1.innerText = count;
}

const GCF = document.querySelector("#GCF");
const LCM = document.querySelector("#LCM");
GCF.addEventListener("click", GreatestCommonFactor);
LCM.addEventListener("click", LeastCommonMultiple);
