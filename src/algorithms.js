import { bus } from './eventBus';

export function merge() {
  console.log("Merge Sort");
}

export async function selection(array) {
  for(let startIndex = 0; startIndex < array.length-1; startIndex++) {
    let minIndex = startIndex;
    
    // get min el in unsorted part
    for(let i = startIndex + 1; i < array.length; i++) {
      if(array[i] < array[minIndex])
        minIndex = i;
    }

    // swap current with minimum
    const tmp = array[startIndex];
    array[startIndex] = array[minIndex];
    array[minIndex] = tmp;

    // show update 
    bus.$emit('rerender');
    await sleep(10);
  }
}

export async function bubble(array) {
  let exchanged = true;
  let bottom = array[array.length-2];
  while(exchanged) {
    exchanged = false;
    for(let i = 0; i<=bottom; i++) {
      if(array[i] > array[i+1]) {
        exchanged = true;
        const tmp = array[i];
        array[i] = array[i+1];
        array[i+1] = tmp;
        // show update 
        bus.$emit('rerender');
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

export function heap() {
  console.log("Heap Sort");
}

export function counting() {
  console.log("Counting Sort");
}

export async function insertion(array) {
  for( let i = 1; i<array.length; i++) {
    let key = array[i];
    let j = i-1;
    while(j >= 0 && key < array[j]) {
      array[j+1] = array[j];
      j--;
      bus.$emit('rerender');
      await sleep(10);
    }
    array[j+1] = key;
    bus.$emit('rerender');
  }
}

export function radix() {
  console.log("Radix Sort");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}