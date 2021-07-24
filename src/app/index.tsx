import * as React from "react";
import * as ReactDOM from "react-dom";

import "./app.css";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>My React App!!</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
