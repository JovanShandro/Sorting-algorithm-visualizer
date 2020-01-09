import { bus } from "./eventBus";

export async function merge(array) {
  const path = [];
  recursiveMerge(array.slice(), 0, array.length - 1, array.slice(), path);

  for (let i = 0; i < path.length; i++) {
    // update array and show change
    array[path[i][0]] = path[i][1];
    await showUpdate();
  }
}

export async function selection(array) {
  for (let startIndex = 0; startIndex < array.length - 1; startIndex++) {
    let minIndex = startIndex;
    // get min el in unsorted part
    for (let i = startIndex + 1; i < array.length; i++) {
      if (array[i] < array[minIndex]) minIndex = i;
    }
    // swap current with minimum
    swap(array, startIndex, minIndex);
    await showUpdate();
  }
}

export async function bubble(array) {
  let exchanged = true;
  let bottom = array[array.length - 2];
  while (exchanged) {
    exchanged = false;
    for (let i = 0; i <= bottom; i++) {
      if (array[i] > array[i + 1]) {
        exchanged = true;
        swap(array, i, i + 1);
        await showUpdate();
      }
    }
    bottom--;
  }
}

export async function quick(array) {
  await quickHelper(array, 0, array.length - 1);
}

export async function heap(array) {
  await build_max_heap(array);
  // sort the heap
  for (let i = array.length - 1; i >= 1; i--) {
    swap(array, 0, i);
    heapsize--;
    // update figure
    await showUpdate();
    await max_heapify(array, 0);
  }
}

export async function counting(array) {
  let max = Math.max(...array);
  let min = Math.min(...array);
  await countingHelper(array, min, max);
}

export async function insertion(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && key < array[j]) {
      array[j + 1] = array[j];
      j--;
      await showUpdate();
    }
    array[j + 1] = key;
    await showUpdate();
  }
}

export function radix() {
  console.log("Radix Sort");
}

/*
  Help functions
*/

// MERGE SORT
function recursiveMerge(aux1, l, r, aux2, path) {
  if (l === r) return;
  const m = Math.floor(l + (r - l) / 2);
  recursiveMerge(aux2, l, m, aux1, path);
  recursiveMerge(aux2, m + 1, r, aux1, path);
  mergeAndUpdatePath(aux1, l, m, r, aux2, path);
}

function mergeAndUpdatePath(aux1, l, m, r, aux2, path) {
  let [k, i, j] = [l, l, m + 1];

  while (i <= m && j <= r) {
    if (aux2[i] <= aux2[j]) {
      path.push([k, aux2[i]]);
      aux1[k++] = aux2[i++];
    } else {
      path.push([k, aux2[j]]);
      aux1[k++] = aux2[j++];
    }
  }
  // if there are still els in left side
  while (i <= m) {
    path.push([k, aux2[i]]);
    aux1[k++] = aux2[i++];
  }

  // if there are still els in right side
  while (j <= r) {
    path.push([k, aux2[j]]);
    aux1[k++] = aux2[j++];
  }
}

//HEAP SORT
let heapsize;
async function max_heapify(array, i) {
  let [l, r] = [2 * i + 1, 2 * i + 2];
  let largest;

  if (l <= heapsize && array[l] > array[i]) {
    largest = l;
  } else largest = i;

  if (r <= heapsize && array[r] > array[largest]) {
    largest = r;
  }

  if (largest != i) {
    swap(array, i, largest);
    await showUpdate();
    await max_heapify(array, largest);
  }
}

// self explanatory
async function build_max_heap(array) {
  heapsize = array.length - 1;
  const N = Math.floor((array.length - 1) / 2);
  for (let i = N; i >= 0; i--) {
    await max_heapify(array, i);
  }
}

//QUICK SORT
async function quickHelper(array, p, r) {
  if (p <= r) {
    const q = await Partition(array, p, r);
    await quickHelper(array, p, q - 1);
    await quickHelper(array, q + 1, r);
  }
}

async function Partition(array, p, r) {
  let pivot = array[p];
  let i = p;
  for (let j = p + 1; j <= r; j++) {
    if (array[j] < pivot) {
      i++;
      swap(array, i, j);
      await showUpdate();
    }
  }
  swap(array, i, p);
  await showUpdate();
  return i;
}

// COUNTING SORT
async function countingHelper(array, min, max) {
  let i = min, j = 0, count = [],
    len = array.length;

  for (i; i <= max; i++) {
    count[i] = 0;
  }
  for (i = 0; i < len; i++) {
    count[array[i]] += 1;
  }
  for (i = min; i <= max; i++) {
    while (count[i] > 0) {
      array[j++] = i;
      count[i]--;
      await showUpdate();
    }
  }
  return array;
}

// GENERAL PURPOSE

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showUpdate() {
  bus.$emit("rerender");
  await sleep(10);
}
