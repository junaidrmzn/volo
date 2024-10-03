import { Grid } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import type { DefinitionFormSchema } from "./definitionFormSchema";

export type DefinitionFormControlsProps = {
    FormControl: (props: FormControlProps<DefinitionFormSchema>) => ReactElement | null;
    onChangeMasterModelOption: (element: unknown) => void;
};

export const DefinitionFormControls = (props: DefinitionFormControlsProps) => {
    const { FormControl, onChangeMasterModelOption } = props;

    return (
        <>
            <FormControl fieldName="title" />
            <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                <FormControl fieldName="masterModel" onChange={onChangeMasterModelOption} />
                <FormControl fieldName="model" />
                <FormControl fieldName="msn" />
            </Grid>
            <Grid templateColumns="repeat(4, 1fr)" gap={3}>
                <FormControl fieldName="ata" />
                <FormControl fieldName="testNumber" />
                <FormControl placeholder="A00" fieldName="revision" />
                <FormControl fieldName="testType" />
            </Grid>
            <FormControl fieldName="summary" />
            <FormControl fieldName="scope" />
            <FormControl fieldName="testArticle" />
        </>
    );
};
