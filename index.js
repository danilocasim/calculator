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

function displaySolution() {
  displayText();

  equal.addEventListener("click", () => {
    if (solution) {
      array = displayValue.split(" ");
      operator = array[array.length - 2];
      secondNumber = array[array.length - 1];
      solution = operate(operator, solution, +secondNumber);
      liveView.textContent = solution;
    } else {
      array = displayValue.split(" ");
      firstNumber = array[array.length - 3];
      operator = array[array.length - 2];
      secondNumber = array[array.length - 1];
      solution = operate(operator, +firstNumber, +secondNumber);
      liveView.textContent = solution;
    }
  });
}

let firstNumber;
let secondNumber;
let operator;
let solution;
let displayValue = "";
let array;

displaySolution();
