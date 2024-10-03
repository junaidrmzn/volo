import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { PdfExportModalProps } from "./PdfExportModal";
import { PdfExportModal } from "./PdfExportModal";

const meta: Meta = {
    title: "Flight Test Definition/Pdf Export Modal",
    component: PdfExportModal,
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
    args: {
        procedures: [
            {
                id: "1",
                title: "Motion Failure Injection - Hover",
                procedureId: "FTD-VC2-01-001-A00-04",
                testPointCount: 5,
                status: "DRAFT",
            },
            {
                id: "2",
                title: "Motion Failure Injection - Looping",
                procedureId: "FTD-VC2-01-001-A00-05",
                testPointCount: 5,
                status: "DRAFT",
            },
        ],
        isOpen: true,
        generatePdfExport: () => {},
    },
};
export default meta;

export const Basic: StoryFn<PdfExportModalProps> = (props) => <PdfExportModal {...props} />;
