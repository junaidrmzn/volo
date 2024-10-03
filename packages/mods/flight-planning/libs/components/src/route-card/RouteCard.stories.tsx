import type { Meta, StoryFn } from "@storybook/react";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { I18nProvider } from "@voloiq/i18n";
import type { RouteCardProps } from "./RouteCard";
import { RouteCard } from "./RouteCard";

const meta: Meta = {
    title: "Flight Planning/Components/Route Card",
    component: RouteCard,
    args: {
        route: anyRoute({ distance: 2500 }),
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
    route: anyRoute({ validationStatus: "valid" }),
};
