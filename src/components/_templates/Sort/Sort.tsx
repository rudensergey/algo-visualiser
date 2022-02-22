// Absolute imports
import React from "react";

// Components
import Button from "@shared/Button";
import Dropdown from "@shared/Dropdown";
import Bar from "@shared/Bar";
import Menu from "@shared/Menu";
import VisualBox from "@shared/VisualBox";
import SortCounter from "@shared/SortCounter";

// Types
import { STATUS, SUPPORTED_ALGORITMS, TSortState, SORT } from "./Sort.types";
import { BUTTON_TYPE } from "@shared/Button/Button.types";
import { VISUAL_BOX_TYPES } from "@shared/VisualBox/VisualBox.types";

// Utils
import { wait } from "@utils/common";
import { NotificationContext } from "@shared/Notification/Notification";
import { NOTIFICATION_TYPES, TShowNotification } from "@shared/Notification/Notification.types";

class Sort extends React.Component<{ showNotification: TShowNotification }, TSortState> {
  constructor(props: { showNotification: TShowNotification }) {
    super(props);

    const items = [];
    for (let i = 1; i <= 50; i++) items.push(i);

    this.state = {
      counter: 0,
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

    this.setState({ items: items, counter: 0 });
    this.props.showNotification("Shuffled!");
  }

  changeAlgorithm(value: SUPPORTED_ALGORITMS) {
    this.setState({ currentAlgorithm: value });
    this.props.showNotification(
      `Algorithm was changed to ${value} sort`,
      NOTIFICATION_TYPES.APPROVE
    );
  }

  async sort() {
    if (this.state.sorting) return;
    this.props.showNotification("Start sorting!");

    await wait(0).then(() => this.setState({ counter: 0, sorting: true }));
    const arr = this.state?.items?.slice() || [];

    await this?.[this.state.currentAlgorithm as keyof Sort]?.(arr);
    this.setState({ selected: null, sorting: false });
    this.props.showNotification("Sorted!", NOTIFICATION_TYPES.APPROVE);
  }

  async bubble(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      let sorted = true;
      this.setState({ counter: this.state.counter + 1 });

      for (let j = 1; j < arr.length - i; j++) {
        const prev = arr[j - 1];
        const curr = arr[j];

        this.setState({ selected: curr, counter: this.state.counter + 1 });

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

  async selection(arr: number[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let sorted = true;
      let max = i;

      for (let j = i; j >= 0; j--) {
        this.setState({ selected: arr[j], counter: this.state.counter + 1 });
        await wait(10).then(() => {
          if (arr[j] > arr[max]) max = j;
          if (arr[j] > arr[j + 1]) sorted = false;
        });
      }

      const swap = arr[i];
      arr[i] = arr[max];
      arr[max] = swap;

      this.setState({ items: arr, counter: this.state.counter + 1 });

      if (sorted) break;
    }
  }

  async insertion(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
      this.setState({ counter: this.state.counter + 1 });

      for (let j = i; j > 0; j--) {
        let sorted = false;
        this.setState({ selected: arr[j], counter: this.state.counter + 1 });

        await wait(10).then(() => {
          if (arr[j - 1] > arr[j]) {
            const swap = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = swap;
            this.setState({ items: arr });
          } else {
            sorted = true;
          }
        });

        if (sorted) break;
      }
    }
  }

  async quick(arr: number[]) {
    const self = this;

    await quickSort(arr, 0, arr.length - 1);

    async function quickSort(arr: number[], left: number, right: number): Promise<void> {
      if (left <= right) {
        const pivot = await partition(arr, left, right);
        await quickSort(arr, left, pivot - 1);
        await quickSort(arr, pivot + 1, right);
        self.setState({ items: arr });
      }
    }

    async function partition(arr: number[], left: number, right: number): Promise<number> {
      if (left <= right) {
        const pivot = right;
        let pivotIndex = left;

        for (let i = left; i <= right; i++) {
          self.setState({ selected: arr[i], counter: self.state.counter + 1 });

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

  async merge(arr: number[]) {
    const self = this;
    await mergeSort(arr, 0, arr.length - 1);

    async function mergeSort(arr: number[], left: number, right: number) {
      if (left >= right) return;
      const mid = left + Math.floor((right - left) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await mergeArrays(arr, left, mid, right);
    }

    async function mergeArrays(arr: number[], left: number, mid: number, right: number) {
      const n1 = mid - left + 1;
      const n2 = right - mid;

      const leftArr = new Array(n1);
      const rightArr = new Array(n2);

      for (let i = 0; i < n1; i++) {
        self.setState({ counter: self.state.counter + 1 });
        leftArr[i] = arr[left + i];
      }
      for (let j = 0; j < n2; j++) {
        self.setState({ counter: self.state.counter + 1 });
        rightArr[j] = arr[mid + 1 + j];
      }

      let i = 0;
      let j = 0;
      let curr = left;

      while (i < n1 && j < n2) {
        self.setState({ selected: curr, counter: self.state.counter + 1 });
        await wait(10).then(() => {
          if (leftArr[i] <= rightArr[j]) arr[curr++] = leftArr[i++];
          else arr[curr++] = rightArr[j++];
          self.setState({ items: arr });
        });
      }

      while (i < n1) {
        self.setState({ selected: curr });
        await wait(10).then(() => {
          arr[curr++] = leftArr[i++];
          self.setState({ items: arr, counter: self.state.counter + 1 });
        });
      }
      while (j < n2) {
        self.setState({ selected: curr });
        await wait(10).then(() => {
          arr[curr++] = rightArr[j++];
          self.setState({ items: arr, counter: self.state.counter + 1 });
        });
      }
    }
  }

  async heap(arr: number[]) {
    const arrLength = arr.length;
    const self = this;

    for (let i = arrLength >> (1 - 1); i >= 0; i--) {
      this.setState({ selected: i, counter: this.state.counter + 1 });
      await heapify(arr, arrLength, i);
    }

    for (let i = arrLength - 1; i >= 0; i--) {
      const swap = arr[0];
      arr[0] = arr[i];
      arr[i] = swap;
      this.setState({ selected: i, counter: this.state.counter + 1 });
      await heapify(arr, i, 0);
    }

    this.setState({ items: arr });

    async function heapify(arr: number[], length: number, i: number) {
      let largest = i;
      const left = largest * 2 + 1;
      const right = largest * 2 + 2;

      if (left < length && arr[largest] < arr[left]) largest = left;
      if (right < length && arr[largest] < arr[right]) largest = right;
      if (largest !== i) {
        await wait(10).then(async () => {
          const swap = arr[largest];
          arr[largest] = arr[i];
          arr[i] = swap;
          self.setState({ items: arr, selected: largest, counter: self.state.counter + 1 });
          await heapify(arr, length, largest);
        });
      }
    }
  }

  render() {
    return (
      <div className={SORT.SORT}>
        <Menu>
          <Button href="/" asHref="/" type={BUTTON_TYPE.GREEN}>
            &lt; Back
          </Button>
          <p className={SORT.TITLE}>
            {this.state.sorting ? STATUS.SORTING : STATUS.CHOSE_ALGORITHM}
          </p>
          <Button onClick={this.shuffleItems}>Shuffle</Button>
          <Dropdown
            defaultValue={SUPPORTED_ALGORITMS.BUBBLE}
            onChange={this.changeAlgorithm}
            list={Object.values(SUPPORTED_ALGORITMS)}
          />
          <Button onClick={this.sort}>Sort</Button>
        </Menu>
        <SortCounter counter={this.state.counter} algorithm={this.state.currentAlgorithm} />
        <VisualBox type={VISUAL_BOX_TYPES.SORT}>
          {this.state.items.map((num, i) => (
            <Bar key={i} value={num} selected={num === this.state.selected} />
          ))}
        </VisualBox>
      </div>
    );
  }
}

const SortComponent = () => (
  <NotificationContext.Consumer>
    {(showNotification: TShowNotification) => <Sort showNotification={showNotification} />}
  </NotificationContext.Consumer>
);

export default SortComponent;
