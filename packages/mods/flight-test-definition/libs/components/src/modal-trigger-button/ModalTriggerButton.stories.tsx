import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { ModalTriggerButtonProps } from "./ModalTriggerButton";
import { ModalTriggerButton } from "./ModalTriggerButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Modal Trigger Button",
    component: ModalTriggerButton,
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Add: StoryFn<ModalTriggerButtonProps> = (props) => <ModalTriggerButton {...props} operationType="add" />;
export const Edit: StoryFn<ModalTriggerButtonProps> = (props) => <ModalTriggerButton {...props} operationType="edit" />;
export const IconButtonAdd: StoryFn<ModalTriggerButtonProps> = (props) => (
    <ModalTriggerButton {...props} triggerType="iconButton" operationType="add" />
);
export const SecondaryButtonEdit: StoryFn<ModalTriggerButtonProps> = (props) => (
    <ModalTriggerButton {...props} triggerType="secondaryButton" operationType="edit" />
);
