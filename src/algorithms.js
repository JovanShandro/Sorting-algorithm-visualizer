import { bus } from "./eventBus";

export async function merge(array) {
  const path = [];
  recursiveMerge(array.slice(), 0, array.length - 1, array.slice(), path);

  for (let i = 0; i < path.length; i++) {
    // update array and show change
    array[path[i][0]] = path[i][1];
    bus.$emit("rerender");
    await sleep(10);
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
    const tmp = array[startIndex];
    array[startIndex] = array[minIndex];
    array[minIndex] = tmp;

    // show update
    bus.$emit("rerender");
    await sleep(10);
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
        const tmp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = tmp;
        // show update
        bus.$emit("rerender");
        await sleep(10);
      }
    }
    bottom--;
  }
  console.log(array);
}

export function quick() {
  console.log("Quick Sort");
}

export async function heap(array) {
  await build_max_heap(array);
  // sort the heap
  for (let i = array.length - 1; i >= 1; i--) {
    const tmp = array[0];
    array[0] = array[i];
    array[i] = tmp;
    heapsize--;
    // update figure
    bus.$emit("rerender");
    await sleep(10);
    await max_heapify(array, 0);
  }
}

export function counting() {
  console.log("Counting Sort");
}

export async function insertion(array) {
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && key < array[j]) {
      array[j + 1] = array[j];
      j--;
      bus.$emit("rerender");
      await sleep(10);
    }
    array[j + 1] = key;
    bus.$emit("rerender");
  }
}

export function radix() {
  console.log("Radix Sort");
}

/*
  Help functions
*/

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    // swap with largest child
    const tmp = array[i];
    array[i] = array[largest];
    array[largest] = tmp;
    // update figure
    bus.$emit("rerender");
    await sleep(10);
    // recursive call on child
    await max_heapify(array, largest);
  }
}

// self explanatory
async function build_max_heap(array) {
  heapsize = array.length-1;
  const N = Math.floor((array.length - 1) / 2);
  for (let i = N; i >= 0; i--) {
    await max_heapify(array, i);
  }
}
