<template>
  <div>
    <nav>
      <h3>Visualize your favourite sorting algorithm</h3>
      <span>
        <button :class="{ disabled: isSorting }" @click="generateRandomArray">
          Generate Random Numbers
        </button>
        <select v-model="choice">
          <option disabled value>Select the Algorithm</option>
          <option value="merge">Merge Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="bubble">Bubble Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
          <option value="counting">Counting Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="radix">Radix Sort</option>
        </select>
        <button :class="{ disabled: isSorting }" @click="sort">Sort</button>
      </span>
    </nav>

    <h3 id="mainText" v-text="mainText"></h3>

    <svg width="700" height="1300" fill="#000" :key="rerender">
      <g
        v-for="(value, i) in array"
        :key="i"
        :transform="`translate(0, ${i * 13})`"
      >
        <rect height="10" :width="value" fill="#5b0466" />
        <text fill="#ffffff" :x="value < 20 ? '0' : '5'" y="10">
          {{ value }}
        </text>
      </g>
    </svg>
  </div>
</template>

<script>
import { bus } from "../eventBus";
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
      array: Array(100).fill(400),
      rerender: 0,
      choice: "",
      isSorting: false,
      mainText: "Welcome to The Sorting Algorithm Visualizer"
    };
  },
  created() {
    bus.$on("rerender", () => {
      this.rerender < 1000 ? this.rerender++ : (this.rerender = 0);
    });
  },
  methods: {
    isSorted() {
      for (let i = 0; i < this.array.length - 1; i++) {
        if (this.array[i] > this.array[i + 1]) {
          return false;
        }
      }
      return true;
    },
    generateRandomArray() {
      if (this.isSorting) return;
      for (let i = 0; i < this.array.length; i++) {
        this.array[i] = Math.floor(Math.random() * 700 + 1);
      }
      this.rerender++;
    },
    async sort() {
      if (this.isSorting || !this.choice || this.isSorted()) return;
      this.isSorting = true;

      this.mainText =
        "Performing " +
        this.choice[0].toUpperCase() +
        this.choice.slice(1) +
        " Sort.";

      switch (this.choice) {
        case "merge":
          await merge(this.array);
          break;
        case "selection":
          await selection(this.array);
          break;
        case "bubble":
          await bubble(this.array);
          break;
        case "quick":
          await quick(this.array);
          break;
        case "heap":
          await heap(this.array);
          break;
        case "counting":
          await counting(this.array);
          break;
        case "insertion":
          await insertion(this.array);
          break;
        case "radix":
          await radix(this.array);
          break;
      }
      this.mainText = "Pick a Sorting Algorithm and Visualize it!";

      this.isSorting = false;
    }
  }
};
</script>

<style></style>
