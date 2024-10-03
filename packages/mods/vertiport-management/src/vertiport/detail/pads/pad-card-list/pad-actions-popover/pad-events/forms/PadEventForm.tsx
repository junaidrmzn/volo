import { Button, Flex, Grid, Icon } from "@volocopter/design-library-react";
import React from "react";
import type { FormProps } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { useVertiportTranslation } from "../../../../../../../translations/useVertiportTranslation";
import { usePadEventForm } from "./usePadEventForm";
import type { PadEventFormSchema } from "./usePadEventFormSchema";

type PadEventFormProps = FormProps<PadEventFormSchema>;

export const PadEventForm = (props: PadEventFormProps) => {
    const { t } = useVertiportTranslation();
    const { FormControl, padEventFormSchema } = usePadEventForm();
    return (
        <FormProvider {...props} schema={padEventFormSchema}>
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <FormControl fieldName="title" />
                <FormControl fieldName="subTitle" />
                <FormControl fieldName="type" />
                <FormControl fieldName="startTime" />
                <FormControl fieldName="endTime" />
            </Grid>
            <Flex justifyContent="flex-end">
                <Button type="submit" leftIcon={<Icon icon="check" size={4} />} size="lg" variant="primary">
                    {t("buttons.done")}
                </Button>
            </Flex>
        </FormProvider>
    );
};
