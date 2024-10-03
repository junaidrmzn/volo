import { Grid } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import type { FlightTestOrderFormSchema } from "./flightTestOrderFormSchema";

export type FlightTestOrderFormControlsProps = {
    FormControl: (props: FormControlProps<FlightTestOrderFormSchema>) => ReactElement | null;
};

export const FlightTestOrderFormControls = (props: FlightTestOrderFormControlsProps) => {
    const { FormControl } = props;

    return (
        <>
            <FormControl fieldName="missionTitle" />
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <FormControl fieldName="masterModel" />
                <FormControl fieldName="msn" />
            </Grid>
        </>
    );
};
