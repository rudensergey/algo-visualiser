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

export class Visualizer extends React.Component {
  state: TVisualizerState;

  constructor(props: any) {
    super(props);

    const items = [];
    for (let i = 1; i <= 50; i++) items.push({ value: i });

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
      const swap = items[idx].value;
      items[idx].value = items[randomIndex].value;
      items[randomIndex].value = swap;
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

  async selection(arr: TItems) {
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

  async insertion(arr: TItems) {
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
        <div className="visualizer__buttons">
          <button className="visualizer__button" onClick={this.shuffleItems}>
            Shuffle
          </button>

          <select name="algorithm" onChange={this.changeAlgorithm}>
            {Object.values(SUPPORTED_ALGORITMS).map((name) => (
              <option value={name}>{`${name} sort`}</option>
            ))}
          </select>
          <button className="visualizer__button" onClick={this.sort}>
            Sort
          </button>
        </div>
        <div className="visualizer__box">
          {this.state.items.map(({ value }) => (
            <Bar value={value} selected={value === this.state.selected}></Bar>
          ))}
        </div>
      </div>
    );
  }
}
