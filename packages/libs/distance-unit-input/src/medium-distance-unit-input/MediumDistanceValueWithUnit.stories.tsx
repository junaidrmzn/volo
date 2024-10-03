import type { Meta, StoryFn } from "@storybook/react";
import type { MediumDistanceValueWithUnitProps } from "./MediumDistanceValueWithUnit";
import { MediumDistanceValueWithUnit } from "./MediumDistanceValueWithUnit";

const meta: Meta = {
    title: "Form/Unit Input/Medium Distance Value With Unit",
    component: MediumDistanceValueWithUnit,
    args: {},
};
export default meta;

export const Basic: StoryFn<MediumDistanceValueWithUnitProps> = (props) => {
    return <MediumDistanceValueWithUnit {...props} />;
};
Basic.args = {
    baseValue: "40.5",
    displayUnit: "ft",
    baseUnit: "m",
};
