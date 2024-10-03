import type { Meta, StoryFn } from "@storybook/react";
import type { ShortDistanceValueWithUnitProps } from "./ShortDistanceValueWithUnit";
import { ShortDistanceValueWithUnit } from "./ShortDistanceValueWithUnit";

const meta: Meta = {
    title: "Form/Unit Input/Short Distance Value With Unit",
    component: ShortDistanceValueWithUnit,
    args: {},
};
export default meta;

export const Basic: StoryFn<ShortDistanceValueWithUnitProps> = (props) => {
    return <ShortDistanceValueWithUnit {...props} />;
};
Basic.args = {
    baseValue: "40.5",
    displayUnit: "mm",
    baseUnit: "in",
};
