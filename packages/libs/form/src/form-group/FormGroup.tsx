import { Box, FormLabel, Stack } from "@volocopter/design-library-react";
import type { PropsWithChildren } from "react";
import type { UseFormGroupProps } from "./useFormGroup";
import { useFormGroup } from "./useFormGroup";

type FormGroupProps = {
    groupLabel?: string;
} & UseFormGroupProps;

export const FormGroup = (props: PropsWithChildren<FormGroupProps>) => {
    const { children, groupLabel } = props;
    const { isDisabled } = useFormGroup(props);

    return (
        <Box width="100%" align="start">
            <FormLabel data-disabled={isDisabled ? "" : null}>{groupLabel}</FormLabel>
            <Stack align="start" direction="column">
                {children}
            </Stack>
        </Box>
    );
};
