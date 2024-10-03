import type { Meta, StoryFn } from "@storybook/react";
import type { LongDistanceValueWithUnitProps } from "./LongDistanceValueWithUnit";
import { LongDistanceValueWithUnit } from "./LongDistanceValueWithUnit";

const meta: Meta = {
    title: "Form/Unit Input/Long Distance Value With Unit",
    component: LongDistanceValueWithUnit,
    args: {},
};
export default meta;

export const Basic: StoryFn<LongDistanceValueWithUnitProps> = (props) => {
    return <LongDistanceValueWithUnit {...props} />;
};
Basic.args = {
    baseValue: "40.5",
    displayUnit: "km",
    baseUnit: "mi",
};
