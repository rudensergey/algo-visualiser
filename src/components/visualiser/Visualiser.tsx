// Absolute imports
import * as React from "react";

// Components
import { Bar } from "../bar/Bar";
import { Button } from "../button/Button";
import { Dropdown } from "../dropdown/Dropdown";

// Types
import { SUPPORTED_ALGORITMS, TItems, TVisualiserState } from "./types";

// Utils
import { wait } from "../../utils/common";

// Style
import "./style.css";

export class Visualiser extends React.Component {
  state: TVisualiserState;

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

  changeAlgorithm(value: SUPPORTED_ALGORITMS) {
    this.setState({ currentAlgorithm: value });
  }

  async sort() {
    if (this.state.sorting) return;
    else this.setState({ sorting: true });

    const arr = this.state?.items?.slice() || [];
    await this?.[this.state.currentAlgorithm as keyof Visualiser]?.(arr);

    this.setState({ selected: null, sorting: false });
  }

  async bubble(arr: TItems) {
    for (let i = 0; i < arr.length; i++) {
      let sorted = true;

      for (let j = 1; j < arr.length; j++) {
        const prev = arr[j - 1];
        const curr = arr[j];

        this.setState({ selected: curr });

        await wait(10).then(() => {
          if (prev >= curr) {
            sorted = false;
            arr[j] = prev;
            arr[j - 1] = curr;
            this.setState({ items: arr });
          }
        });
      }

      if (sorted) break;
    }
  }

  async selection(arr: TItems) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let sorted = true;
      let max = i;

      for (let j = i; j >= 0; j--) {
        this.setState({ selected: arr[j] });
        await wait(10).then(() => {
          if (arr[j] > arr[max]) max = j;
          if (arr[j] > arr[j + 1]) sorted = false;
        });
      }

      const swap = arr[i];
      arr[i] = arr[max];
      arr[max] = swap;

      this.setState({ items: arr });

      if (sorted) break;
    }
  }

  async insertion(arr: TItems) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i; j > 0; j--) {
        this.setState({ selected: arr[j] });

        await wait(10).then(() => {
          if (arr[j - 1] > arr[j]) {
            const swap = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = swap;
            this.setState({ items: arr });
          }
        });
      }
    }
  }

  async quick(arr: TItems) {
    const self = this;

    await quickSort(arr, 0, arr.length - 1);

    async function quickSort(
      arr: TItems,
      left: number,
      right: number,
    ): Promise<void> {
      if (left <= right) {
        const pivot = await partition(arr, left, right);
        await quickSort(arr, left, pivot - 1);
        await quickSort(arr, pivot + 1, right);
        self.setState({ items: arr });
      }
    }

    async function partition(
      arr: TItems,
      left: number,
      right: number,
    ): Promise<number> {
      if (left <= right) {
        let pivot = right;
        let pivotIndex = left;

        for (let i = left; i <= right; i++) {
          self.setState({ selected: arr[i] });

          await wait(10).then(() => {
            if (arr[i] < arr[pivot]) {
              const swap = arr[i];
              arr[i] = arr[pivotIndex];
              arr[pivotIndex] = swap;
              pivotIndex++;
              self.setState({ items: arr });
            }
          });
        }

        const swap = arr[pivot];
        arr[pivot] = arr[pivotIndex];
        arr[pivotIndex] = swap;

        return pivotIndex;
      }
    }
  }

  render() {
    return (
      <div className="visualiser">
        <div className="visualiser__buttons">
          <p className="visualiser__title">
            {this.state.sorting ? "Sorting..." : "Choose your algorithm"}
          </p>
          <Button classNames="visualiser__button" onClick={this.shuffleItems}>
            Shuffle
          </Button>
          <Dropdown
            onChange={this.changeAlgorithm}
            list={Object.values(SUPPORTED_ALGORITMS)}
          ></Dropdown>
          <Button classNames="visualiser__button" onClick={this.sort}>
            Sort
          </Button>
        </div>
        <div className="visualiser__box">
          {this.state.items.map((num) => (
            <Bar value={num} selected={num === this.state.selected}></Bar>
          ))}
        </div>
      </div>
    );
  }
}
