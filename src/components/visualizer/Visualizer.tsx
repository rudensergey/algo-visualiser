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
    this.showItems = this.showItems.bind(this);
    this.shuffleItems = this.shuffleItems.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
  }

  componentDidMount() {
    this.showItems();
  }

  showItems() {
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
    const items = this.state.items.slice();

    for (let i = 0; i < items.length; i++) {
      for (let j = 1; j < items.length; j++) {
        this.setState({ selected: j });
        await wait(20).then(() => {
          if (items[j - 1].value >= items[j].value) {
            const swap = items[j].value;
            items[j].value = items[j - 1].value;
            items[j - 1].value = swap;
          }
        });
      }
    }

    this.setState({ items: items, selected: null, sorting: false });
  }

  render() {
    return (
      <div className="visualizer">
        <button onClick={this.shuffleItems}>Shuffle</button>
        <button onClick={this.bubbleSort}>Bubble Sort</button>
        <div className="visualizer__box">
          {this.state.items.map(({ value }) => (
            <Bar value={value} selected={value === this.state.selected}></Bar>
          ))}
        </div>
      </div>
    );
  }
}
