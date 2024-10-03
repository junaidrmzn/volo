import { HStack, Text, VStack } from "@volocopter/design-library-react";
import { FormSection } from "@voloiq/commercial-scheduling-components";
import { LocalTimeDisplay } from "@voloiq/date-time";
import { FormProvider } from "@voloiq/form";
import { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";
import { useAddConnection } from "./useAddConnection";

export type AddConnectionFormProps = RenderAddHandlerProps;

export const AddConnection = (props: AddConnectionFormProps) => {
    const { formRef, onSubmit, onAfterSubmit, onSubmitError } = props;
    const { t } = useConnectionTranslation();
    const {
        FormControl,
        connectionSchema,
        onCreate,
        onChangeSelectedRegion,
        onChangeSelectedAircraftType,
        onChangeSelectedArrivalVertiport,
        onChangeSelectedDepartureVertiport,
        passengerSeats,
        isVertiportFormControlsVisible,
    } = useAddConnection();

    const renderAdditionalDateTimeInfo = (value: Date) => {
        return <>{value && <LocalTimeDisplay value={value} />}</>;
    };

    return (
        <FormProvider
            formId="connectionCreateForm"
            schema={connectionSchema}
            formType="create"
            formRef={formRef}
            onAfterSubmit={onAfterSubmit}
            onSubmitError={onSubmitError}
            initialValues={{ validFrom: new Date() }}
            onCreate={(...args) => {
                onSubmit();
                return onCreate(...args);
            }}
        >
            <VStack maxW={800} minW={400} spacing={6} paddingBottom={6}>
                <FormSection label={t("details.general")} orientation="v">
                    <FormControl fieldName="name" />
                    <HStack alignItems="flex-start" spacing={6} width="full">
                        <FormControl fieldName="title" />
                        <FormControl fieldName="subtitle" />
                    </HStack>
                </FormSection>
                <FormSection label={t("details.flight")} orientation="v">
                    <FormControl fieldName="category" />
                    <FormControl fieldName="flightDuration" />
                    <FormControl
                        fieldName="aircraftType"
                        onChange={(data) => onChangeSelectedAircraftType((data as { value: string }).value)}
                    />
                    {passengerSeats && (
                        <Text size="small" width="100%" align="left">
                            {t("create.passengerSeats", { seats: passengerSeats })}
                        </Text>
                    )}

                    <FormControl
                        fieldName="region"
                        onChange={(data) => onChangeSelectedRegion((data as { value: string }).value)}
                    />

                    {isVertiportFormControlsVisible && (
                        <HStack alignItems="flex-start" spacing={6} width="full">
                            <FormControl
                                fieldName="departureVertiport"
                                onChange={(data) =>
                                    onChangeSelectedDepartureVertiport((data as { value: string }).value)
                                }
                            />
                            <FormControl
                                fieldName="arrivalVertiport"
                                onChange={(data) => onChangeSelectedArrivalVertiport((data as { value: string }).value)}
                            />
                        </HStack>
                    )}
                </FormSection>

                <FormSection label={t("details.valid")}>
                    <FormControl fieldName="validFrom" additionalDateTimeInfo={renderAdditionalDateTimeInfo} />
                    <FormControl fieldName="validTo" additionalDateTimeInfo={renderAdditionalDateTimeInfo} />
                </FormSection>
            </VStack>
        </FormProvider>
    );
};
