import { AppShell } from "@voloiq/app-shell";
import { AppRouter } from "./AppRouter";

export const App = () => (
    <AppShell withTheme withRouter>
        <AppRouter />
    </AppShell>
);
