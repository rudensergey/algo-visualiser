import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.css";
import { Menu } from "./components/menu/Menu";

class App extends React.Component {
  render() {
    return (
      <>
        <Menu></Menu>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
