import { Grid } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import { AircraftConfigurationFormSchema } from "./useAircraftConfigurationFormSchema";

export type AircraftConfigurationFormControlsProps = {
    FormControl: (props: FormControlProps<AircraftConfigurationFormSchema>) => ReactElement | null;
};

export const AircraftConfigurationFormControls = (props: AircraftConfigurationFormControlsProps) => {
    const { FormControl } = props;

    return (
        <>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
                <FormControl fieldName="allUpMass" />
                <FormControl fieldName="centerOfGravity" />
                <FormControl fieldName="massAndBalanceCategory" />
                <FormControl fieldName="ballasts" />
            </Grid>
            <Grid gridTemplateColumns="repeat(4, 1fr)" gap={3}>
                <FormControl fieldName="charging" />
                <FormControl fieldName="bingo" />
                <FormControl fieldName="totalDuration" />
                <FormControl fieldName="setupSheet" />
            </Grid>
            <FormControl fieldName="notesToAircraft" />
        </>
    );
};
