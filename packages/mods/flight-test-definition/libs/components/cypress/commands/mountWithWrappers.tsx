import { mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";

export const mountWithWrappers: typeof mount = (children) =>
    mount(
        <AppShell withI18n withTheme>
            {children}
        </AppShell>
    );
