import { mount } from "cypress/react";
import { AppShell } from "@voloiq/app-shell";

export const mountWithWrappers: typeof mount = (children) =>
    mount(
        <AppShell withAuth withI18n withParametersCache withTheme withFeatureFlags>
            {children}
        </AppShell>
    );
