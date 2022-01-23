import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.css";

import { Visualiser } from "./components/visualiser/Visualiser";

class App extends React.Component {
  render() {
    return <Visualiser></Visualiser>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
