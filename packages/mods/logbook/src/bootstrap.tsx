import ReactDOM from "react-dom";
import { AppShell } from "@voloiq/app-shell";
import { App } from "./App";

const AppWithBackendUrl = () => {
    const serviceUrl = "/logbook/v6";
    const backendBaseUrl = `${BACKEND_BASE_URL}${serviceUrl}`;

    return <App backendBaseUrl={backendBaseUrl} />;
};
ReactDOM.render(
    <AppShell withTheme withI18n>
        <AppWithBackendUrl />
    </AppShell>,
    document.querySelector("#app")
);
