import type { Meta, StoryFn } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import type { ApplicableRequirementCardProps } from "./ApplicableRequirementCard";
import { ApplicableRequirementCard } from "./ApplicableRequirementCard";

const meta: Meta = {
    title: "Flight Test Definition/Applicable Requirement Card",
    component: ApplicableRequirementCard,
    args: {
        applicableRequirement: {
            title: "#1181 -> #42371",
            content: "The Flight Control System shall provide control for Altitude.",
            passFailCriteria: "FCS Rate Command and Altitude Hold mode must be able to function with motor(s) failed.",
        },
    },
    parameters: { actions: { argTypesRegex: "^on.*" } },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<ApplicableRequirementCardProps> = (props) => <ApplicableRequirementCard {...props} />;
export const WithSwitch: StoryFn<ApplicableRequirementCardProps> = (props) => <ApplicableRequirementCard {...props} />;
WithSwitch.args = {
    withSwitch: true,
};
