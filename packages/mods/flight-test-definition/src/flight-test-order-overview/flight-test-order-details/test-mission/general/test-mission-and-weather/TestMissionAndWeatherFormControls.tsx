import { Grid } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { TestMissionAndWeatherFormSchema } from "./useTestMissionAndWeatherFormSchema";

export type TestMissionAndWeatherFormControlsProps = {
    FormControl: (props: FormControlProps<TestMissionAndWeatherFormSchema>) => ReactElement | null;
};

export const TestMissionAndWeatherFormControls = (props: TestMissionAndWeatherFormControlsProps) => {
    const { FormControl } = props;

    return (
        <>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
                <FormControl fieldName="maxTestAltitude" />
                <FormControl fieldName="flightRule" />
                <FormControl fieldName="departure" />
                <FormControl fieldName="arrival" />
            </Grid>
            <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                <FormControl fieldName="frequencyOperations" />
                <FormControl fieldName="frequencyTower" />
                <FormControl fieldName="optionalFrequency" />
            </Grid>
            <FormControl fieldName="airspaceRequested" />
            <FormControl fieldName="weatherLimits" />
            <FormControl fieldName="weatherObserved" />
        </>
    );
};
