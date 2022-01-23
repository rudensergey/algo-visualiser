import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.css";

import { Menu } from "./components/menu/Menu";
import { Visualizer } from "./components/visualizer/Visualizer";

class App extends React.Component {
  render() {
    return (
      <>
        <Menu></Menu>
        <Visualizer></Visualizer>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
