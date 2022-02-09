import React from "react";
import ReactDOM from "react-dom";
import { Main } from "./components/main/Main";
import "./app.css";

class App extends React.Component {
  render() {
    return <Main></Main>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
