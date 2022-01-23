import * as React from "react";
import "./style.css";

export class Visualizer extends React.Component {
  state: Readonly<{ items: Array<{ value: number }> }>;

  constructor(props: any) {
    super(props);
    this.state = { items: [] };
    this.showItems = this.showItems.bind(this);
    this.shuffleItems = this.shuffleItems.bind(this);
  }

  showItems() {
    const items = [];
    for (let i = 1; i <= 50; i++) items.push({ value: i });
    this.setState({ items: items });
  }

  shuffleItems() {
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

  render() {
    return (
      <div className="visualizer">
        <button onClick={this.showItems}>Show</button>
        <button onClick={this.shuffleItems}>Shuffle</button>
        <div className="visualizer__box">
          {this.state.items.length
            ? this.state.items.map(({ value }) => (
                <div
                  style={{ height: value * 2 + "%" }}
                  className="visualizer__item"
                ></div>
              ))
            : ""}
        </div>
      </div>
    );
  }
}
