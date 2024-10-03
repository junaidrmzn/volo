import { Box, Card, SimpleGrid } from "@volocopter/design-library-react";
import type { ChargingStation, ChargingStationCreate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useNavigate } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useCreateChargingStation } from "../../api-hooks/useChargingStationService";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useChargingStationCreateForm } from "./useChargingStationCreateForm";

type ChargingStationAddProps = RenderAddHandlerProps;

export const CreateChargingStation = (props: ChargingStationAddProps) => {
    const { formRef } = props;
    const { t } = useResourcesTranslation();
    const { FormControl, createChargingStationSchema } = useChargingStationCreateForm();
    const navigation = useNavigate();
    const { sendRequest } = useCreateChargingStation();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    return (
        <FormProvider
            formId="chargingStationCreateForm"
            formRef={formRef}
            schema={createChargingStationSchema}
            formType="create"
            initialValues={{ validFrom: new Date() }}
            onCreate={(chargingStationFormData) => {
                const data: ChargingStationCreate = {
                    name: chargingStationFormData.name,
                    validFrom: chargingStationFormData.validFrom ? chargingStationFormData.validFrom.toISOString() : "",
                    validTo: chargingStationFormData.validTo ? chargingStationFormData.validTo.toISOString() : "",
                    chargingStationStatus: chargingStationFormData.chargingStationStatus.value,
                    transferTimeVtol: chargingStationFormData.transferTimeVtol,
                    transferTimeStorage: chargingStationFormData.transferTimeStorage,
                    maxPower: chargingStationFormData.maxPower,
                    nrSlots: chargingStationFormData.nrSlots,
                    vertiport: chargingStationFormData.vertiport.value,
                    edgeDeviceId: chargingStationFormData.edgeDeviceId,
                    facilityId: chargingStationFormData.facilityId,
                };
                sendRequest({ data })
                    .then((response) => {
                        if (response) {
                            onSuccess(t("charging-station.create.success"));
                        }
                    })
                    .catch((error: AxiosError<ResponseEnvelope<ChargingStation>>) => {
                        if (error.response && error.response.data.error) {
                            onError(error.response.data.error);
                        }
                    })
                    .finally(() => {
                        navigation("/battery-management/charging-stations");
                    });
            }}
        >
            <Box width="100%">
                <Card>
                    <SimpleGrid columns={{ sm: 2, md: 4, lg: 5 }} spacing="20px" w="full">
                        <FormControl fieldName="name" />
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
