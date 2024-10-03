import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { ProcedureSelectionListProps } from "./ProcedureSelectionList";
import { ProcedureSelectionList } from "./ProcedureSelectionList";

const meta: Meta = {
    title: "Flight Test Definition/Procedure Selection List",
    component: ProcedureSelectionList,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
    args: {
        proceduresWithSelection: [
            {
                id: "1",
                title: "Motion Failure Injection - Hover",
                procedureId: "FTD-VC2-01-001-A00-04",
                testPointCount: 5,
                status: "DRAFT",
                isSelected: true,
            },
            {
                id: "2",
                title: "Motion Failure Injection - Hover",
                procedureId: "FTD-VC2-01-001-A00-04",
                testPointCount: 5,
                status: "DRAFT",
                isSelected: false,
            },
        ],
        clearAllProcedures: () => {},
        selectAllProcedures: () => {},
    },
};
export default meta;

export const Basic: StoryFn<ProcedureSelectionListProps> = (props) => <ProcedureSelectionList {...props} />;
