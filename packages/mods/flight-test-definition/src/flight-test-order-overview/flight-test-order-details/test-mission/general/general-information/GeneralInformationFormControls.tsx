import { Grid } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import type { GeneralInformationFormSchema } from "./useGeneralInformationFormSchema";

export type GeneralInformationFormControlsProps = {
    FormControl: (props: FormControlProps<GeneralInformationFormSchema>) => ReactElement | null;
};

export const GeneralInformationFormControls = (props: GeneralInformationFormControlsProps) => {
    const { FormControl } = props;

    return (
        <>
            <FormControl fieldName="missionTitle" />
            <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3}>
                <FormControl fieldName="flightNumber" />
                <FormControl fieldName="flightTestCategory" />
                <FormControl fieldName="riskLevel" />
            </Grid>
            <FormControl fieldName="missionObjective" />
        </>
    );
};
