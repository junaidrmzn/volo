import type { Meta, StoryFn } from "@storybook/react";
import { v4 as uuidV4 } from "uuid";
import { I18nProvider } from "@voloiq/i18n";
import type { FtiParameterCardProps } from "./FtiParameterCard";
import { FtiParameterCard } from "./FtiParameterCard";

export const anyFtiParameter = () => ({
    id: uuidV4(),
    shortDescription: "Lorem Ipsum",
    isEssential: true,
    workgroup: "EPU",
    ataIspec: { label: "21- Environmental Control System" },
    aircraftZone: { label: "C: Aft Compartment" },
    sensorType: { label: "11 - Thermocouples" },
    unit: { label: "kWh" },
    ftiCode: "2121110006",
});

const meta: Meta = {
    title: "Flight Test Definition/FTI Parameter Card",
    component: FtiParameterCard,
    parameters: {
        actions: { argTypesRegex: "^on.*" },
        backgrounds: {
            default: "white",
            values: [
                {
                    name: "white",
                    value: "#ffffff",
                },
            ],
        },
    },
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
    args: {
        ftiParameter: anyFtiParameter(),
    },
};
export default meta;

export const Basic: StoryFn<FtiParameterCardProps> = (props) => <FtiParameterCard {...props} />;
export const WithEssentialToggle: StoryFn<FtiParameterCardProps> = (props) => <FtiParameterCard {...props} />;
WithEssentialToggle.args = {
    withEssentialToggle: true,
};
