/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Center, Spinner } from "@volocopter/design-library-react";
import type { EsuType, EsuTypeUpdate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate, useParams } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useGetAircraftTypes } from "../../api-hooks/useBatteryManagementAircraftTypeService";
import { useUpdateEsuType } from "../../api-hooks/useEsuTypeService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useEsuTypeEditForm } from "./useEsuTypeEditForm";

export const EditEsuType = () => {
    const { esuTypeId } = useParams();
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { FormControl, esuTypeInitialValues, editEsuTypeSchema, esuTypeGetState } = useEsuTypeEditForm(
        esuTypeId || "-1"
    );
    const { data: aircraftTypes } = useGetAircraftTypes(1);
    const { sendRequestById } = useUpdateEsuType();
    const { onSuccess } = useSuccessToast();
    const { onError } = useErrorToast();

    return (
        <ResourceCreateLayout
            formName="esuTypeEditForm"
            title={t("esu-type.edit.heading")}
            addButtonLabel={t("esu-type.edit.update")}
        >
            {esuTypeGetState === "error" || (!esuTypeInitialValues && <Box>Error occurred</Box>)}
            {esuTypeGetState === "pending" && (
                <Center>
                    <Spinner />
                </Center>
            )}

            {esuTypeGetState === "success" && (
                <FormProvider
                    formId="esuTypeEditForm"
                    schema={editEsuTypeSchema}
                    formType="edit"
                    initialValues={esuTypeInitialValues}
                    onEdit={(esuTypeFormData) => {
                        const aircraftTypesIds = new Set(esuTypeFormData.aircraftTypes.map((type) => type.value));
                        const data: EsuTypeUpdate = {
                            id: esuTypeId!,
                            name: esuTypeFormData.name,
                            manualCharging: esuTypeFormData.chargingMode.value === "manual",
                            aircraftTypes: aircraftTypes
                                .map((aircraftType) => aircraftType.id)
                                .filter((id) => aircraftTypesIds.has(id.toString())),
                            validFrom: esuTypeFormData.validFrom ? esuTypeFormData.validFrom.toISOString() : "",
                            validTo: esuTypeFormData.validTo ? esuTypeFormData.validTo.toISOString() : "",
                        };
                        sendRequestById(esuTypeId || -1, { data })
                            .then((response) => {
                                if (response) {
                                    onSuccess(t("esu-type.edit.success"));
                                }
                            })
                            .catch((error: AxiosError<ResponseEnvelope<EsuType>>) => {
                                if (error.response && error.response.data.error) {
                                    onError(error.response.data.error);
                                }
                            })
                            .finally(() => navigation(".."));
                    }}
                >
                    <FormControl fieldName="name" />
                    <FormControl fieldName="chargingMode" />
                    <FormControl fieldName="aircraftTypes" />
                    <FormControl fieldName="validFrom" />
                    <FormControl fieldName="validTo" />
                </FormProvider>
            )}
        </ResourceCreateLayout>
    );
};
