import { Box, Card, SimpleGrid } from "@volocopter/design-library-react";
import type { ChargingStation, ChargingStationSlotCreate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useNavigate } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useCreateChargingStationSlot } from "../../api-hooks/useChargingStationSlotService";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useChargingStationSlotCreateForm } from "./useChargingStationSlotCreateForm";

type ChargingStationSlotAddProps = RenderAddHandlerProps;

export const CreateChargingStationSlot = (props: ChargingStationSlotAddProps) => {
    const { formRef } = props;

    const { t } = useResourcesTranslation();
    const { FormControl, createChargingStationSlotSchema } = useChargingStationSlotCreateForm();
    const navigation = useNavigate();
    const { sendRequest } = useCreateChargingStationSlot();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    return (
        <FormProvider
            formId="chargingStationCreateForm"
            formRef={formRef}
            schema={createChargingStationSlotSchema}
            formType="create"
            initialValues={{ validFrom: new Date() }}
            onCreate={(chargingStationSlotFormData) => {
                const data: ChargingStationSlotCreate = {
                    name: chargingStationSlotFormData.name,
                    validFrom: chargingStationSlotFormData.validFrom
                        ? chargingStationSlotFormData.validFrom.toISOString()
                        : "",
                    validTo: chargingStationSlotFormData.validTo
                        ? chargingStationSlotFormData.validTo.toISOString()
                        : "",
                    chargingStationSlotStatus: chargingStationSlotFormData.chargingStationSlotStatus.value,
                    nrChargeEsu: chargingStationSlotFormData.nrChargeEsu,
                    supportedEsuTypes: chargingStationSlotFormData.supportedEsuTypes.map((esuType) => esuType.value),
                    slotNumber: chargingStationSlotFormData.slotNumber,
                    chargingStation: chargingStationSlotFormData.chargingStation.value,
                };
                sendRequest({ data })
                    .then((response) => {
                        if (response) {
                            onSuccess(t("charging-station-slot.create.success"));
                        }
                    })
                    .catch((error: AxiosError<ResponseEnvelope<ChargingStation>>) => {
                        if (error.response && error.response.data.error) {
                            onError(error.response.data.error);
                        }
                    })
                    .finally(() => {
                        navigation("/battery-management/charging-station-slots");
                    });
            }}
        >
            <Box width="100%">
                <Card>
                    <SimpleGrid columns={{ sm: 2, md: 4, lg: 3 }} spacing="20px" w="full">
                        <FormControl fieldName="name" />
                        <FormControl fieldName="validFrom" />
                        <FormControl fieldName="validTo" />
                        <FormControl fieldName="chargingStationSlotStatus" />
                        <FormControl fieldName="nrChargeEsu" />
                        <FormControl fieldName="supportedEsuTypes" />
                        <FormControl fieldName="slotNumber" />
                        <FormControl fieldName="chargingStation" />
                    </SimpleGrid>
                </Card>
            </Box>
        </FormProvider>
    );
};
