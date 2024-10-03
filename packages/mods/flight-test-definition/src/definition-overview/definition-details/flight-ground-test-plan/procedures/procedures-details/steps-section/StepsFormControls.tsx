import { Box, VStack } from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import type { FormControlProps } from "@voloiq/form";
import type { StepsFormSchema } from "./useStepsSectionFormSchema";

export type StepsFormControlsProps = {
    FormControl: (props: FormControlProps<StepsFormSchema>) => ReactElement | null;
};

export const StepsFormControls = (props: StepsFormControlsProps) => {
    const { FormControl } = props;

    return (
        <VStack spacing={3} alignItems="stretch">
            {(["stepSetup", "stepProcedure", "stepRecovery"] as const).map((fieldName) => (
                <Box key={fieldName} p={3} borderRadius="sm" backgroundColor="gray300Gray800">
                    <FormControl fieldName={fieldName} />
                </Box>
            ))}
        </VStack>
    );
};
