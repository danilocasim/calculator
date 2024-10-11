"use strict";

const liveView = document.querySelector(".live-solution");
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");
const dot = document.querySelector(".dot");

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
    displayValue += ` ${buttonContent} `;
    liveView.textContent = "";
  }
}

function dotLimiter() {
  if (liveView.textContent.split("").includes(".")) {
    dot.disabled = true;
    dot.style.color = "#00FFFF,";
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
  let deleteNum = () => arr.pop();

  let arr = displayValue.split("");
  deleteNum();
  displayValue = arr.join("");
  liveView.textContent = displayValue;
  dotLimiter();
});

document.body.addEventListener("keydown", (e) => {
  let key = e.key;
  if (Number.isInteger(+key) && key !== " ") {
    displayValue += e.key;
    liveView.textContent += e.key;
  } else if (key == "Backspace") {
    clearText();
  } else if (key == "Enter") {
    getCalculation(solution);
  }
});
