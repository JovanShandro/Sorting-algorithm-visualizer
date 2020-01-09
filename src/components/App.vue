<template>
  <div>
    <h1>Visualize your favourite sorting algorithm</h1>
    <button @click="generateRandomArray">Random</button>
    <select v-model="choice">
      <option disabled value>Select the Algorithm</option>
      <option value="0">Merge Sort</option>
      <option value="1">Selection Sort</option>
      <option value="2">Bubble Sort</option>
      <option value="3">Quick Sort</option>
      <option value="4">Heap Sort</option>
      <option value="5">Counting Sort</option>
      <option value="6">Insertion Sort</option>
      <option value="7">Radix Sort</option>
    </select>
    <button @click="sort">Sort</button>

    <svg
      width="700"
      height="1300"
      fill="#000"
      :key="rerender"
    >
      <g v-for="(value, i) in array" :key="i" :transform="`translate(0, ${i * 13})`">
        <rect height="10" :width="value" fill="#523456" />
        <text fill="#ffffff" x="5" y="10">{{ value }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
import { bus } from '../eventBus';
import {
  merge,
  selection,
  bubble,
  quick,
  heap,
  counting,
  insertion,
  radix
} from "../algorithms";

export default {
  name: "App",
  data() {
    return {
      array: Array(100).fill(100),
      rerender: 0,
      choice: "",
    };
  },
  created() {
    bus.$on('rerender', () => {
      (this.rerender < 1000) ? this.rerender++ : this.rerender = 0;
    });
  },
  methods: {
    generateRandomArray() {
      for (let i = 0; i < this.array.length; i++) {
        this.array[i] = Math.floor(Math.random() * 700 + 1);
      }
      this.rerender++;
    },
    async sort() {
      switch (this.choice) {
        case "0": await merge(this.array); break;
        case "1": await selection(this.array); break;
        case "2": await bubble(this.array); break;
        case "3": quick(); break;
        case "4": heap(); break;
        case "5": counting(); break;
        case "6": await insertion(this.array); break;
        case "7": radix(); break;
      }
    }
  }
};
</script>

<style>
</style>
