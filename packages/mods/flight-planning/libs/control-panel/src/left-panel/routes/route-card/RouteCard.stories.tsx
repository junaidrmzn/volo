import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { RouteCardProps } from "./RouteCard";
import { RouteCard } from "./RouteCard";

const meta: Meta = {
    title: "Flight Planning/Control Panel/Route Card",
    component: RouteCard,
    args: {
        route: {
            id: 1,
            name: "North Route",
            distance: 8.3,
            duration: 183,
            validationStatus: "",
        },
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

export const Basic: StoryFn<RouteCardProps> = (props) => <RouteCard {...props} />;

export const WithStatusBadge: StoryFn<RouteCardProps> = (props) => <RouteCard {...props} />;

WithStatusBadge.args = {
    route: {
        id: 1,
        name: "North Route",
        distance: 8.3,
        duration: 183,
        validationStatus: "valid",
    },
};
