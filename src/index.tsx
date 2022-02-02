import * as React from "react";
import * as ReactDOM from "react-dom";

import { Menu } from "./components/menu/Menu";
import { Visualiser } from "./components/visualiser/Visualiser";

import "./app.css";
import { Main } from "./components/main/Main";

class App extends React.Component {
  render() {
    return <Main></Main>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
