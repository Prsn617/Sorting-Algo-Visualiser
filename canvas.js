let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth - 203;
canvas.height = window.innerHeight - 3;
let c = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const btn = document.getElementById("btn");
const sort = document.getElementsByName("sort");

let sorter;
for (let i = 0; i < sort.length; i++) {
  sort[i].addEventListener("click", () => {
    sort[i].clicked = true;
    sorter = sort[i].id;
  });
}

let color = "#ddd";
let greenBox;
let redBox;
let start = 0;
let arr = [];
boxWidth = 10;
left = 0;
right = arr.length - 1;

let background = "#222";
c.fillStyle = background;
c.fillRect(0, 0, WIDTH, HEIGHT);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
function play(e) {
  e.preventDefault();
  switch (sorter) {
    case "merge":
      mergeSort(arr, 0, arr.length - 1);
      console.log("merge");
      break;
    case "selection":
      selectionSort(arr);
      console.log("selection");
      break;
    case "quick":
      quickSort(arr, 0, arr.length - 1);
      console.log("quick");
  }
}

async function selectionSort(arrs) {
  for (let i = 0; i < arrs.length; i++) {
    let min = arrs[i];
    let minIndex = i;
    for (let j = i; j < arrs.length; j++) {
      if (arrs[j] < min) {
        min = arrs[j];
        minIndex = j;
      }
    }

    await sleep(100);
    greenBox = i;
    redBox = minIndex;
    [arrs[i], arrs[minIndex]] = [arrs[minIndex], arrs[i]];
  }
  return arrs;
}

async function mergeSort(dataList, left, right) {
  if (left < right) {
    let mid = left + Math.floor((right - left) / 2);
    await Promise.all([
      mergeSort(arr, left, mid),
      mergeSort(arr, mid + 1, right),
    ]);
    await merge(dataList, left, mid, right);
  }
}
async function merge(arrs, begin, mid, end) {
  let begin2 = mid + 1;
  if (arrs[mid] <= arrs[begin2]) return;
  while (begin <= mid && begin2 <= end) {
    if (arrs[begin] <= arrs[begin2]) {
      begin++;
    } else {
      let value = arrs[begin2];
      let index = begin2;

      while (index != begin) {
        await sleep(0);
        arrs[index] = arrs[index - 1];
        greenBox = index;
        redBox = index - 1;
        index--;
      }
      greenBox = begin;
      arrs[begin] = value;
      redBox = value;

      begin++;
      mid++;
      begin2++;
    }
  }
}

async function quickSort(arrs, low, high) {
  if (low < high) {
    let pi = await partition(arrs, low, high);

    await Promise.all([
      quickSort(arrs, low, pi - 1),
      quickSort(arrs, pi + 1, high),
    ]);
  }
}
async function partition(arrs, low, high) {
  let pivot = arrs[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arrs[j] < pivot) {
      i++;
      await sleep(100);
      [arrs[i], arrs[j]] = [arrs[j], arrs[i]];
      greenBox = i;
      redBox = j;
    }
  }

  await sleep(300);
  greenBox = i + 1;
  redBox = high;
  [arrs[i + 1], arrs[high]] = [arrs[high], arrs[i + 1]];
  return i + 1;
}

for (let i = 0; i < WIDTH - boxWidth; i += boxWidth) {
  arr.push(randomIntFromInterval(20, HEIGHT));
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = background;
  c.fillRect(0, 0, WIDTH, HEIGHT);

  for (let i = 0; i < arr.length; i++) {
    color = i === greenBox ? "#66cc66" : i === redBox ? "#ff5555" : "#ddd";
    c.fillStyle = color;
    c.fillRect(i * boxWidth, HEIGHT - arr[i], boxWidth - 1, arr[i]);
  }
  start++;
}

animate();
// let testArr = [1, 5, 2, 3, 8, 0];
// console.log(testArr);
