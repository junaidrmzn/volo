/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Card, SimpleGrid } from "@volocopter/design-library-react";
import type { ChargingStation, Vertiport } from "@voloiq-typescript-api/battery-management-types";
import type { MutableRefObject } from "react";
import type { FormValues } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { useChargingStationEditForm } from "./useChargingStationEditForm";
import type { useChargingStationFormSchema } from "./useChargingStationFormSchema";

export type EditChargingStationFormProps = {
    onSubmit: (formValues: FormValues<ReturnType<typeof useChargingStationFormSchema>>) => void;
    formRef: MutableRefObject<HTMLFormElement | null>;
    chargingStation: ChargingStation;
    vertiports: Vertiport[];
};

export const EditChargingStationForm = (props: EditChargingStationFormProps) => {
    const { onSubmit, formRef, chargingStation, vertiports } = props;
    const { FormControl, chargingStationInitialValues, editChargingStationSchema } = useChargingStationEditForm({
        chargingStation,
        vertiports,
    });

    return (
        <FormProvider
            formRef={formRef}
            schema={editChargingStationSchema}
            formType="edit"
            initialValues={chargingStationInitialValues}
            onEdit={onSubmit}
        >
            <Box width="100%">
                <Card>
                    <SimpleGrid columns={{ sm: 2, md: 4, lg: 5 }} spacing="20px" w="full">
                        <FormControl fieldName="name" isNotEditable />
                        <FormControl fieldName="validFrom" />
                        <FormControl fieldName="validTo" />
                        <FormControl fieldName="chargingStationStatus" />
                        <FormControl fieldName="vertiport" />
                        <FormControl fieldName="facilityId" />
                        <FormControl fieldName="edgeDeviceId" />
                        <FormControl fieldName="transferTimeVtol" />
                        <FormControl fieldName="transferTimeStorage" />
                        <FormControl fieldName="maxPower" />
                        <FormControl fieldName="nrSlots" />
                    </SimpleGrid>
                </Card>
            </Box>
        </FormProvider>
    );
};
