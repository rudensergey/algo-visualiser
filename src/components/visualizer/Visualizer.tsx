// Absolute imports
import * as React from "react";

// Components
import { Bar } from "../bar/Bar";

// Types
import { SUPPORTED_ALGORITMS, TItems, TVisualizerState } from "./types";

// Utils
import { wait } from "../../utils/common";

// Style
import "./style.css";
import { Button } from "../button/Button";

export class Visualizer extends React.Component {
  state: TVisualizerState;

  constructor(props: any) {
    super(props);

    const items = [];
    for (let i = 1; i <= 50; i++) items.push(i);

    this.state = {
      items: items,
      selected: null,
      sorting: false,
      currentAlgorithm: SUPPORTED_ALGORITMS.BUBBLE,
    };

    this.changeAlgorithm = this.changeAlgorithm.bind(this);
    this.shuffleItems = this.shuffleItems.bind(this);
    this.sort = this.sort.bind(this);
  }

  shuffleItems() {
    if (this.state.sorting) return;

    const items = this.state.items.slice();
    let idx = items.length;

    while (idx) {
      const randomIndex = Math.floor(Math.random() * idx--);
      const swap = items[idx];
      items[idx] = items[randomIndex];
      items[randomIndex] = swap;
    }

    this.setState({ items: items });
  }

  changeAlgorithm(event: React.ChangeEvent) {
    const target = event.target as HTMLTextAreaElement;
    if (target.value) this.setState({ currentAlgorithm: target.value });
  }

  async sort() {
    if (this.state.sorting) return;
    else this.setState({ sorting: true });

    const arr = this.state.items.slice();
    await this?.[this.state.currentAlgorithm as keyof Visualizer]?.(arr);
  }

  async bubble(arr: TItems) {
    for (let i = 0; i < arr.length; i++) {
      let sorted = true;

      for (let j = 1; j < arr.length; j++) {
        this.setState({ selected: arr[j] });

        await wait(10).then(() => {
          if (arr[j - 1] >= arr[j]) {
            sorted = false;
            const swap = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = swap;
            this.setState({ items: arr });
          }
        });
      }

      if (sorted) break;
    }

    this.setState({ selected: null, sorting: false });
  }

  async selection(arr: TItems) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let max = i;

      for (let j = i; j >= 0; j--) {
        this.setState({ selected: arr[j] });
        await wait(10).then(() => {
          if (arr[j] > arr[max]) max = j;
        });
      }

      const swap = arr[i];
      arr[i] = arr[max];
      arr[max] = swap;
      this.setState({ items: arr });
    }

    this.setState({ selected: null, sorting: false });
  }

  render() {
    return (
      <div className="visualizer">
        <div className="visualizer__buttons">
          <Button classNames="visualizer__button" onClick={this.shuffleItems}>
            Shuffle
          </Button>
          <select name="algorithm" onChange={this.changeAlgorithm}>
            {Object.values(SUPPORTED_ALGORITMS).map((name) => (
              <option value={name}>{`${name} sort`}</option>
            ))}
          </select>
          <Button classNames="visualizer__button" onClick={this.sort}>
            Sort
          </Button>
        </div>
        <div className="visualizer__box">
          {this.state.items.map((num) => (
            <Bar value={num} selected={num === this.state.selected}></Bar>
          ))}
        </div>
      </div>
    );
  }
}
