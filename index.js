"use strict";

const liveView = document.querySelector(".live-solution");
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const dot = document.querySelector(".dot");
const negative = document.querySelector(".negative");
const operators = document.querySelectorAll(".operator");

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
  let words = ["i miss u", "i love you", "mama mo", "engk", "error tol"];
  let random = Math.floor(Math.random() * words.length);
  if (num2 == 0) return words[random];
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

  displayValue = displayValue.split(" ");
}

function continuousCalculation(containValue) {
  array = displayValue.split(" ");
  firstNumber = containValue ? solution : array[array.length - 5];
  operator = array[array.length - 4];
  secondNumber = array[array.length - 3];
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

function addOperand(number) {
  if (liveView.textContent == solution) {
    liveView.textContent = "";
  }
  displayValue += number;
  liveView.textContent += number;
}

function displayText(button) {
  const buttonContent = button.textContent;

  if (button.classList.contains("number")) {
    addOperand(buttonContent);
  } else if (button.classList.contains("operator")) {
    negativeOrOperator(buttonContent);
  }
  if (
    displayValue.split(" ").length >= 5 &&
    button.classList.contains("operator")
  ) {
    continuousCalculation(solution);
    liveView.textContent = solution;
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
  array = [];
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
  if ((Number.isInteger(+key) && key !== " ") || key == ".") {
    addOperand(key);
  } else if (operators.includes(key)) {
    negativeOrOperator(key);
  } else if (key == "Backspace") {
    clearText();
  } else if (key == "Enter") {
    getCalculation(solution);
  }
  if (displayValue.split(" ").length >= 5 && operators.includes(key)) {
    continuousCalculation(solution);
    liveView.textContent = solution;
  }
});
