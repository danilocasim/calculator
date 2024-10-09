"use strict";

const liveView = document.querySelector(".live-solution");
const buttons = document.querySelectorAll("button");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");

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

function displayText() {
  buttons.forEach((button) => {
    const buttonContent = button.textContent;
    button.addEventListener("click", () => {
      if (button.classList.contains("number")) {
        displayValue += buttonContent;
        liveView.textContent += buttonContent;
      } else if (button.classList.contains("operator")) {
        displayValue += ` ${buttonContent} `;
        liveView.textContent = "";
      }
    });
  });
}

function clearText() {
  clear.addEventListener("click", () => {
    liveView.textContent = "";
    displayValue = "";
    solution = "";
  });
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
  liveView.textContent = solution ? solution : "";
}

function displaySolution() {
  displayText();
  clearText();

  equal.addEventListener("click", () => {
    getCalculation(solution);
  });
}

let firstNumber;
let secondNumber;
let operator;
let solution;
let displayValue = "";
let array;

displaySolution();
