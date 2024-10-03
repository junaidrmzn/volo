import { Button, Flex, Icon } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { FormProvider } from "@voloiq/form";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";
import { useQuickFilters } from "./quick-filters-context/useQuickFilters";
import { useCustomDateForm } from "./useCustomDateForm";

export type CreateCalendarType = {
    goToDate: Date;
};

export const CustomDateFilterForm = () => {
    const { FormControl, createCustomDateSchema } = useCustomDateForm();
    const { setSelectedTagState, setScheduledDate } = useQuickFilters();
    const { formatDate } = useFormatDateTime();

    const { t } = useScheduledMissionTranslation();
    return (
        <FormProvider
            formId="customDateFilterForm"
            schema={createCustomDateSchema}
            formType="create"
            onCreate={(formData: CreateCalendarType) => {
                const data = {
                    goToDate: formData.goToDate,
                };

                setSelectedTagState("custom");
                setScheduledDate(formatDate(data.goToDate));
            }}
        >
            <FormControl fieldName="goToDate" />
            <Flex justifyContent="flex-end">
                <Button
                    type="submit"
                    form="customDateFilterForm"
                    leftIcon={<Icon icon="check" size={4} />}
                    size="lg"
                    variant="primary"
                >
                    {t("quickFilters.customDate.go")}
                </Button>
            </Flex>
        </FormProvider>
    );
};
