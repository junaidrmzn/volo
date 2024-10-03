import type { Meta, StoryFn } from "@storybook/react";
import { Button, FormControl, FormLabel, HStack, Text } from "@volocopter/design-library-react";
import { useState } from "react";
import type { LongDistanceUnit } from "./LongDistanceUnit";
import type { LongDistanceUnitInputProps } from "./LongDistanceUnitInput";
import { LongDistanceUnitInput } from "./LongDistanceUnitInput";

const meta: Meta = {
    title: "Form/Unit Input/Long Distance",
    component: LongDistanceUnitInput,
    args: {},
};
export default meta;
const useValue = (defaultValue?: string) => useState<string>(defaultValue ?? "");
const useDisplayUnit = (defaultUnit: LongDistanceUnit = "km") => useState<LongDistanceUnit>(defaultUnit);

export const Basic: StoryFn<LongDistanceUnitInputProps> = (props) => {
    const [displayValue, setDisplayValue] = useValue();
    const [baseValue, setBaseValue] = useValue();
    const [displayUnit, setDisplayUnit] = useDisplayUnit();

    return (
        <>
            <FormControl isRequired>
                <FormLabel>Long Distance</FormLabel>
                <LongDistanceUnitInput
                    {...props}
                    value={displayValue}
                    onChange={setDisplayValue}
                    displayUnit={displayUnit}
                    baseUnit="km"
                    defaultBaseValue={baseValue}
                    onBaseValueChange={setBaseValue}
                />
            </FormControl>
            <HStack mt={3}>
                <Button onClick={() => setDisplayUnit("km")}>km</Button>
                <Button onClick={() => setDisplayUnit("mi")}>mi</Button>
                <Button onClick={() => setDisplayUnit("nm")}>nm</Button>
            </HStack>
            <Text>base value: {baseValue}</Text>
        </>
    );
};
