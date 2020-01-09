import { bus } from './eventBus';

export function merge() {
  console.log("Merge Sort");
}

export function selection() {
  console.log("Selection Sort");
}

export function bubble() {
  console.log("Bubble Sort");
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