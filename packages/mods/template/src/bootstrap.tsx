import ReactDOM from "react-dom";
import { AppShell } from "@voloiq/app-shell";
import { App } from "./App";

ReactDOM.render(
    <AppShell withTheme withI18n>
        <App />
    </AppShell>,
    document.querySelector("#app")
);
