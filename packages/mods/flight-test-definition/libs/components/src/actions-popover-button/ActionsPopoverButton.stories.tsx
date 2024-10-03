import type { Meta, StoryFn } from "@storybook/react";
import { Button, Icon, VStack } from "@volocopter/design-library-react";
import { I18nProvider } from "@voloiq/i18n";
import type { ActionsPopoverButtonProps } from "./ActionsPopoverButton";
import { ActionsPopoverButton } from "./ActionsPopoverButton";

const meta: Meta = {
    title: "Flight Test Definition/Components/Actions Popover Button",
    component: ActionsPopoverButton,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
    args: {
        renderActionButtons: (onClosePopover: () => void) => (
            <VStack spacing={3} alignItems="start">
                <Button variant="ghost" size="lg" leftIcon={<Icon icon="edit" />} onClick={onClosePopover}>
                    Edit Desireability
                </Button>
                <Button variant="ghost" size="lg" leftIcon={<Icon icon="minus" />} onClick={onClosePopover}>
                    Remove Parameter
                </Button>
            </VStack>
        ),
    },
};
export default meta;

export const WithHeader: StoryFn<ActionsPopoverButtonProps> = (props) => <ActionsPopoverButton {...props} withHeader />;
export const WithoutHeader: StoryFn<ActionsPopoverButtonProps> = (props) => <ActionsPopoverButton {...props} />;
