import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { ProcedureIdentifierProps } from "./ProcedureIdentifier";
import { ProcedureIdentifier } from "./ProcedureIdentifier";

const meta: Meta = {
    title: "Flight Test Definition/Components/Procedure Identifier",
    component: ProcedureIdentifier,
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
    args: {
        title: "Motion Failure Injection - Forward Speed Envelope",
        procedureId: "FTD-VC2-01-001-A00-03",
        testPointCount: 5,
        procedureIndex: 1,
        status: "DRAFT",
    },
};
export default meta;

export const Basic: StoryFn<ProcedureIdentifierProps> = (props) => <ProcedureIdentifier {...props} />;
