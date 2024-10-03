import { Grid, GridItem } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import type { TestAircraftFormSchema } from "./useTestAircraftFormSchema";

export type TestAircraftFormControlsProps = {
    FormControl: (props: FormControlProps<TestAircraftFormSchema>) => ReactElement | null;
};

export const TestAircraftFormControls = (props: TestAircraftFormControlsProps) => {
    const { FormControl } = props;

    return (
        <>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
                <FormControl fieldName="masterModel" />
                <FormControl fieldName="model" />
                <FormControl fieldName="msn" />
                <FormControl fieldName="applicability" />
            </Grid>
            <FormControl fieldName="aircraftCallsign" />
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
                <GridItem colSpan={2}>
                    <FormControl fieldName="flightConditions" />
                </GridItem>
                <FormControl fieldName="revision" />
                <FormControl fieldName="issueDateFlightConditions" />
            </Grid>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
                <GridItem colSpan={2}>
                    <FormControl fieldName="permitToFly" />
                </GridItem>
                <FormControl fieldName="issueDatePermitToFly" />
                <FormControl fieldName="validUntil" />
            </Grid>
        </>
    );
};
