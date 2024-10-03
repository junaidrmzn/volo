/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Card, SimpleGrid } from "@volocopter/design-library-react";
import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import type { MutableRefObject } from "react";
import type { FormValues } from "@voloiq/form";
import { FormProvider } from "@voloiq/form";
import { useChargingStationSlotEditForm } from "./useChargingStationSlotEditForm";
import type { useChargingStationSlotFormSchema } from "./useChargingStationSlotFormSchema";

export type EditChargingStationSlotFormProps = {
    onSubmit: (formValues: FormValues<ReturnType<typeof useChargingStationSlotFormSchema>>) => void;
    formRef: MutableRefObject<HTMLFormElement | null>;
    chargingStationSlot: ChargingStationSlot;
};

export const EditChargingStationSlotForm = (props: EditChargingStationSlotFormProps) => {
    const { onSubmit, formRef, chargingStationSlot } = props;
    const { FormControl, chargingStationSlotInitialValues, editChargingStationSlotSchema } =
        useChargingStationSlotEditForm({
            chargingStationSlot,
        });

    return (
        <FormProvider
            formRef={formRef}
            schema={editChargingStationSlotSchema}
            formType="edit"
            initialValues={chargingStationSlotInitialValues}
            onEdit={onSubmit}
        >
            <Box width="100%">
                <Card>
                    <SimpleGrid columns={{ sm: 2, md: 4, lg: 3 }} spacing="20px" w="full">
                        <FormControl fieldName="name" isNotEditable />
                        <FormControl fieldName="validFrom" />
                        <FormControl fieldName="validTo" />
                        <FormControl fieldName="chargingStationSlotStatus" />
                        <FormControl fieldName="supportedEsuTypes" />
                        <FormControl fieldName="nrChargeEsu" />
                        <FormControl fieldName="slotNumber" />
                        <FormControl fieldName="chargingStation" />
                    </SimpleGrid>
                </Card>
            </Box>
        </FormProvider>
    );
};
