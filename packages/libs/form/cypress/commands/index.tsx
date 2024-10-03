import { ThemeProvider } from "@volocopter/design-library-react";
import { mount } from "cypress/react";
import { I18nProvider } from "@voloiq/i18n";

declare global {
    namespace Cypress {
        // eslint-disable-next-line prefer-type-alias/prefer-type-alias
        interface Chainable {
            mount: typeof mount;
        }
    }
}

const mountWithWrappers: typeof mount = (children) =>
    mount(
        <ThemeProvider>
            <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
    );
Cypress.Commands.add("mount", mountWithWrappers);
