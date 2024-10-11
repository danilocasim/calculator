"use strict";

const liveView = document.querySelector(".live-solution");
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const dot = document.querySelector(".dot");
const negative = document.querySelector(".negative");

let firstNumber;
let secondNumber;
let operator;
let solution;
let displayValue = "";
let array;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 == 0) return "i miss u";
  return num1 / num2;
}

function modulo(num1, num2) {
  return num1 % num2;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    case "%":
      return modulo(firstNumber, secondNumber);
  }
}

function round(num) {
  if (isNaN(num)) return num;
  return Math.round(num * 100) / 100;
}

function getCalculation(containValue) {
  array = displayValue.split(" ");
  firstNumber = containValue ? solution : array[array.length - 3];
  operator = array[array.length - 2];
  secondNumber = array[array.length - 1];
  solution = round(operate(operator, +firstNumber, +secondNumber));
  liveView.textContent = solution;
}

function negativeOrOperator(key) {
  if (liveView.textContent == "" && key == "-") {
    displayValue += "-";
    liveView.textContent = "-";
  } else {
    displayValue += ` ${key} `;
    liveView.textContent = "";
  }
}

function clearText() {
  liveView.textContent = "";
  displayValue = "";
  solution = "";
}

function displayText(button) {
  const buttonContent = button.textContent;

  if (button.classList.contains("number")) {
    displayValue += buttonContent;
    liveView.textContent += buttonContent;
  } else if (button.classList.contains("operator")) {
    negativeOrOperator(buttonContent);
  }
}

function dotLimiter() {
  const cyan = "#00FFFF";

  if (liveView.textContent.split("").includes(".")) {
    dot.disabled = true;
    dot.style.color = cyan;
  } else {
    dot.disabled = false;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayText(button);
    dotLimiter();
  });
});
equal.addEventListener("click", () => {
  getCalculation(solution);
  dotLimiter();
});

clear.addEventListener("click", () => {
  clearText();
  dotLimiter();
});

del.addEventListener("click", () => {
  let deleteNum = (arr) => arr.pop();

  let live = liveView.textContent.split("");
  let display = displayValue.split("");
  deleteNum(live);
  deleteNum(display);
  displayValue = display.join("");
  liveView.textContent = live.join("");
  dotLimiter();
});

document.body.addEventListener("keydown", (e) => {
  let operators = ["+", "-", "/", "*", "%"];

  let key = e.key;
  if ((Number.isInteger(+key) && key !== " ") || key == "." || key == "-") {
    if (liveView.textContent == "" && key == "-") {
      displayValue += "-";
      liveView.textContent = "-";
    } else {
      displayValue += ` ${key} `;
      liveView.textContent = "";
    }
    displayValue += key;
    liveView.textContent += key;
  } else if (operators.includes(key)) {
    displayValue += ` ${key} `;
    liveView.textContent = "";
  } else if (key == "Backspace") {
    clearText();
  } else if (key == "Enter") {
    getCalculation(solution);
  }
});
