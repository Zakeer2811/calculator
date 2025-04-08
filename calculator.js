let resultField = document.getElementById("result");
let justCalculated = false;
function getMemory() {
  return parseFloat(localStorage.getItem("calculatorMemory")) || 0;
}
function setMemory(value) {
  localStorage.setItem("calculatorMemory", value.toString());
}
function append(value) {
  if (
    justCalculated ||
    resultField.value === "0" ||
    resultField.value === "Error"
  ) {
    resultField.value = value;
    justCalculated = false;
  } else {
    resultField.value += value;
  }
}

function clearAll() {
  resultField.value = "0";
  justCalculated = false;
}

function backSpace() {
  if (resultField.value.length > 1) {
    resultField.value = resultField.value.slice(0, -1);
  } else {
    resultField.value = "0";
  }
  justCalculated = false;
}

function changeSign() {
  const expr = resultField.value.trim();

  // If the expression is a standalone number, simply change its sign.
  if (/^-?\d+(\.\d+)?$/.test(expr)) {
    resultField.value = (-parseFloat(expr)).toString();
    justCalculated = false;
    return;
  }

  // Use regex to find the last number in the expression.
  // This regex looks for an optional minus sign followed by one or more digits,
  // optionally with a decimal portion, anchored at the end of the string.
  resultField.value = expr.replace(
    /(-?\d+(\.\d+)?)\s*$/,
    (match, numberStr) => {
      const num = parseFloat(numberStr);
      // Toggle the sign of the captured number.
      return (-num).toString();
    }
  );

  justCalculated = false;
}

function calculate() {
  try {
    let expression = resultField.value.replace(/x/g, "*");
    let result = eval(expression);
    resultField.value = Number.isFinite(result) ? result : "Error";
    justCalculated = true;
  } catch {
    resultField.value = "Error";
    justCalculated = true;
  }
}

function memorySave() {
  try {
    let value = parseFloat(resultField.value);
    if (!isNaN(value)) {
      setMemory(value);
    }
  } catch {
    setMemory(0);
  }
}

function memoryRestore() {
  resultField.value = getMemory().toString();
  justCalculated = true;
}

function memoryAdd() {
  try {
    let current = parseFloat(resultField.value) || 0;
    let stored = getMemory();
    setMemory(stored + current);
  } catch {}
}

function memoryMinus() {
  try {
    let current = parseFloat(resultField.value) || 0;
    let stored = getMemory();
    setMemory(stored - current);
  } catch {}
}

function memoryCancel() {
  localStorage.removeItem("calculatorMemory");
}
