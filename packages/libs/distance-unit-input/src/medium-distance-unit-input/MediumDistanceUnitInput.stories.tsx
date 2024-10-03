import type { Meta, StoryFn } from "@storybook/react";
import { Button, FormControl, FormLabel, HStack, Text } from "@volocopter/design-library-react";
import { useState } from "react";
import type { MediumDistanceUnit } from "./MediumDistanceUnit";
import type { MediumDistanceUnitInputProps } from "./MediumDistanceUnitInput";
import { MediumDistanceUnitInput } from "./MediumDistanceUnitInput";

const meta: Meta = {
    title: "Form/Unit Input/Medium Distance",
    component: MediumDistanceUnitInput,
    args: {},
};
export default meta;
const useValue = (defaultValue?: string) => useState<string>(defaultValue ?? "");
const useDisplayUnit = (defaultUnit: MediumDistanceUnit = "ft") => useState<MediumDistanceUnit>(defaultUnit);

export const Basic: StoryFn<MediumDistanceUnitInputProps> = (props) => {
    const [displayValue, setDisplayValue] = useValue();
    const [baseValue, setBaseValue] = useValue();
    const [displayUnit, setDisplayUnit] = useDisplayUnit();

    return (
        <>
            <FormControl isRequired>
                <FormLabel>Medium Distance</FormLabel>
                <MediumDistanceUnitInput
                    {...props}
                    value={displayValue}
                    onChange={setDisplayValue}
                    displayUnit={displayUnit}
                    baseUnit="ft"
                    defaultBaseValue={baseValue}
                    onBaseValueChange={setBaseValue}
                />
            </FormControl>
            <HStack mt={3}>
                <Button onClick={() => setDisplayUnit("ft")}>ft</Button>
                <Button onClick={() => setDisplayUnit("m")}>m</Button>
            </HStack>
            <Text>base value: {baseValue}</Text>
        </>
    );
};
