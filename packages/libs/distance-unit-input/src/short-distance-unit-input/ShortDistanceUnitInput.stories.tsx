import type { Meta, StoryFn } from "@storybook/react";
import { Button, FormControl, FormLabel, HStack, Text } from "@volocopter/design-library-react";
import { useState } from "react";
import type { ShortDistanceUnit } from "./ShortDistanceUnit";
import type { ShortDistanceUnitInputProps } from "./ShortDistanceUnitInput";
import { ShortDistanceUnitInput } from "./ShortDistanceUnitInput";

const meta: Meta = {
    title: "Form/Unit Input/Short Distance",
    component: ShortDistanceUnitInput,
    args: {},
};
export default meta;
const useValue = (defaultValue?: string) => useState<string>(defaultValue ?? "");
const useDisplayUnit = (defaultUnit: ShortDistanceUnit = "mm") => useState<ShortDistanceUnit>(defaultUnit);

export const Basic: StoryFn<ShortDistanceUnitInputProps> = (props) => {
    const [displayValue, setDisplayValue] = useValue();
    const [baseValue, setBaseValue] = useValue();
    const [displayUnit, setDisplayUnit] = useDisplayUnit();

    return (
        <>
            <FormControl isRequired>
                <FormLabel>Short Distance</FormLabel>
                <ShortDistanceUnitInput
                    {...props}
                    value={displayValue}
                    onChange={setDisplayValue}
                    displayUnit={displayUnit}
                    baseUnit="mm"
                    defaultBaseValue={baseValue}
                    onBaseValueChange={setBaseValue}
                />
            </FormControl>
            <HStack mt={3}>
                <Button onClick={() => setDisplayUnit("mm")}>mm</Button>
                <Button onClick={() => setDisplayUnit("in")}>in</Button>
            </HStack>
            <Text>base value: {baseValue}</Text>
        </>
    );
};
