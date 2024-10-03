import type { Meta, StoryFn } from "@storybook/react";
import type { ModalHeaderLayoutProps } from "./ModalHeaderLayout";
import { ModalHeaderLayout } from "./ModalHeaderLayout";

const meta: Meta = {
    title: "Text-Layouts/Modal Header",
    args: {
        modalType: "Add",
        modalTitle: "Flight Test Definition",
    },
};
export default meta;

export const Basic: StoryFn<ModalHeaderLayoutProps> = (props) => <ModalHeaderLayout {...props} />;
