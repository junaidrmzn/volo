/* eslint-disable unicorn/prefer-module */
import ReactDOM from "react-dom";
import { App } from "./components/App";

ReactDOM.render(<App />, document.querySelector("#app"));

// enables HMR
if (module.hot) {
    module.hot.accept();
}
