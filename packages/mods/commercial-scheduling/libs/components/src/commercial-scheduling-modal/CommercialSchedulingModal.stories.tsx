import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { CommercialSchedulingModal, CommercialSchedulingModalProps } from "./CommercialSchedulingModal";

const meta: Meta = {
    title: "Commercial Schedule/Components/Commercial Schedule Modal",
    args: {
        heading: "Commercial Schedule Modal",
        isOpen: true,
        onClose: () => {},
    },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<CommercialSchedulingModalProps> = (props) => <CommercialSchedulingModal {...props} />;
