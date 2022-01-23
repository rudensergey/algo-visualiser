import * as React from "react";
import { Bar } from "../bar/Bar";
import "./style.css";

const wait = (time: number) => new Promise((res) => setTimeout(res, time));

export class Visualizer extends React.Component {
  state: Readonly<{
    items: Array<{ value: number }>;
    selected: number;
    sorting: boolean;
  }>;

  constructor(props: any) {
    super(props);
    this.state = { items: [], selected: null, sorting: false };
    this.shuffleItems = this.shuffleItems.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
  }

  componentDidMount() {
    const items = [];
    for (let i = 1; i <= 50; i++) items.push({ value: i });
    this.setState({ items: items });
  }

  shuffleItems() {
    if (this.state.sorting) return;

    const items = this.state.items.slice();
    let idx = items.length;

    while (idx) {
      const randomIndex = Math.floor(Math.random() * idx--);
      const swap = items[idx].value;
      items[idx].value = items[randomIndex].value;
      items[randomIndex].value = swap;
    }

    this.setState({ items: items });
  }

  async bubbleSort() {
    if (this.state.sorting) return;

    this.setState({ sorting: true });
    const arr = this.state.items.slice();

    for (let i = 0; i < arr.length; i++) {
      let sorted = true;

      for (let j = 1; j < arr.length; j++) {
        this.setState({ selected: arr[j].value });
        await wait(10).then(() => {
          if (arr[j - 1].value >= arr[j].value) {
            sorted = false;
            const swap = arr[j].value;
            arr[j].value = arr[j - 1].value;
            arr[j - 1].value = swap;
          }
        });
      }

      if (sorted) break;
    }

    this.setState({ items: arr, selected: null, sorting: false });
  }

  async selectionSort() {
    if (this.state.sorting) return;

    this.setState({ sorting: true });
    const arr = this.state.items.slice();

    for (let i = arr.length - 1; i >= 0; i--) {
      let max = i;

      for (let j = i; j >= 0; j--) {
        this.setState({ selected: arr[j].value });

        await wait(10).then(() => {
          if (arr[j].value > arr[max].value) max = j;
        });
      }

      const swap = arr[i].value;
      arr[i].value = arr[max].value;
      arr[max].value = swap;
    }

    this.setState({ items: arr, selected: null, sorting: false });
  }

  render() {
    return (
      <div className="visualizer">
        <button onClick={this.shuffleItems}>Shuffle</button>
        <button onClick={this.bubbleSort}>Bubble Sort</button>
        <button onClick={this.selectionSort}>Selection Sort</button>
        <div className="visualizer__box">
          {this.state.items.map(({ value }) => (
            <Bar value={value} selected={value === this.state.selected}></Bar>
          ))}
        </div>
      </div>
    );
  }
}
