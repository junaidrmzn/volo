import type { Meta, StoryFn } from "@storybook/react";
import { anyProcedure } from "@voloiq/flight-test-definition-api/v1";
import { I18nProvider } from "@voloiq/i18n";
import { MemoryRouter } from "@voloiq/routing";
import type { ProcedureCardProps } from "./ProcedureCard";
import { ProcedureCard } from "./ProcedureCard";

const meta: Meta = {
    title: "Flight Test Definition/Procedure Card",
    component: ProcedureCard,
    args: {
        procedure: anyProcedure(),
        procedureIndex: 1,
    },
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <I18nProvider>
                    <Story />
                </I18nProvider>
            </MemoryRouter>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<ProcedureCardProps> = (props) => <ProcedureCard {...props} />;
