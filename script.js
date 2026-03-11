const n = 10;
let arrayBubble = [];
let arrayInsert = [];
let compCount = 0;
let swapCount = 0;

let shiftCount = 0;
let insertCount = 0;

initBubble();
initInsert();

function initBubble() {
  arrayBubble = [...Array(100).keys()]
    .map((n) => n + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, n);

  showBarsBubble();
  showDataBubble();
}

function initInsert() {
  arrayInsert = [...Array(100).keys()]
    .map((n) => n + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, n);

  showBarsInsert();
  showDataInsert();
}

function playBubble() {
  const copy = [...arrayBubble];
  const moves = bubbleSort(copy);
  animateBubble(moves);
}

function playInsert() {
  const copy = [...arrayInsert];
  const moves = insertionSort(copy);
  animateInsert(moves);
}

function animateBubble(moves) {
  if (moves.length == 0) {
    compCount = 0;
    swapCount = 0;
    showBarsBubble();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [arrayBubble[i], arrayBubble[j]] = [arrayBubble[j], arrayBubble[i]];
  }
  showBarsBubble(move);
  showDataBubble(move);
  setTimeout(function () {
    animateBubble(moves);
  }, 200);
}

function animateInsert(moves) {
  if (moves.length == 0) {
    shiftCount = 0;
    insertCount = 0;
    showBarsInsert();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "shift") {
    [arrayInsert[i], arrayInsert[j]] = [arrayInsert[j], arrayInsert[i]];
  }
  showBarsInsert(move);
  showDataInsert(move);
  setTimeout(function () {
    animateInsert(moves);
  }, 100);
}

function bubbleSort(arrayBubble) {
  const moves = [];
  let swapped;
  let n = arrayBubble.length;
  do {
    swapped = false;

    for (let i = 1; i < n; i++) {
      moves.push({ indices: [i - 1, i], type: "comp" });
      if (arrayBubble[i - 1] > arrayBubble[i]) {
        moves.push({ indices: [i - 1, i], type: "swap" });
        swapped = true;
        temp = arrayBubble[i - 1];
        arrayBubble[i - 1] = arrayBubble[i];
        arrayBubble[i] = temp;
      }
    }
    n--;
  } while (swapped);
  return moves;
}

function insertionSort(arrayInsert) {
  const moves = [];

  for (let i = 1; i < n; i++) {
    current = arrayInsert[i];
    j = i - 1;
    let originalIndex = i;
    moves.push({ type: "select", indices: [i] });
    while (j >= 0 && arrayInsert[j] > current) {
      arrayInsert[j + 1] = arrayInsert[j];
      moves.push({
        type: "shift",
        indices: [j, j + 1],
      });
      j = j - 1;
    }
    arrayInsert[j + 1] = current;
    if (j + 1 !== originalIndex) {
      moves.push({
        type: "insert",
        indices: [j + 1],
      });
    }
  }

  return moves;
}

function showBarsBubble(move) {
  container.innerHTML = "";
  boxContainer.innerHTML = "";

  for (let i = 0; i < arrayBubble.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = arrayBubble[i] + "%";
    bar.classList.add("bar");

    const value = document.createElement("div");
    value.textContent = arrayBubble[i];
    value.classList.add("box");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "red" : "green";
      value.style.backgroundColor = move.type == "swap" ? "red" : "green";
    }

    container.appendChild(bar);
    boxContainer.appendChild(value);
  }
}

function showBarsInsert(move) {
  container2.innerHTML = "";
  boxContainer2.innerHTML = "";

  for (let i = 0; i < arrayInsert.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = arrayInsert[i] + "%";
    bar.classList.add("bar");

    const value = document.createElement("div");
    value.textContent = arrayInsert[i];
    value.classList.add("box");

    if (move && move.indices.includes(i)) {
      if (move.type === "select") {
        bar.style.backgroundColor = "orange";
        value.style.backgroundColor = "orange";
      }
      if (move.type === "insert") {
        bar.style.backgroundColor = "green";
        value.style.backgroundColor = "green";
      }
    }

    container2.appendChild(bar);
    boxContainer2.appendChild(value);
  }
}

function showDataBubble(move) {
  dataContainer.innerHTML = "";
  if (move) {
    move.type == "swap" ? swapCount++ : compCount++;

    const swapsDiv = document.createElement("div");
    swapsDiv.textContent = "Swaps " + swapCount;
    swapsDiv.classList.add("swaps");

    const compDiv = document.createElement("div");
    compDiv.textContent = "Comparisons " + compCount;
    compDiv.classList.add("comp");

    dataContainer.appendChild(swapsDiv);
    dataContainer.appendChild(compDiv);
  }
}

function showDataInsert(move) {
  dataContainer2.innerHTML = "";
  if (move) {
    if (move.type == "shift") {
      shiftCount++;
    }
    if (move.type == "insert") {
      insertCount++;
    }

    const swapsDiv = document.createElement("div");
    swapsDiv.textContent = "Shifts " + shiftCount;
    swapsDiv.classList.add("swaps");

    const compDiv = document.createElement("div");
    compDiv.textContent = "Inserts " + insertCount;
    compDiv.classList.add("comp");

    dataContainer2.appendChild(swapsDiv);
    dataContainer2.appendChild(compDiv);
  }
}
