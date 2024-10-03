/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Center, Spinner } from "@volocopter/design-library-react";
import type { Esu, EsuUpdate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate, useParams } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useUpdateEsu } from "../../api-hooks/useEsuService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useEsuEditForm } from "./useEsuEditForm";

export const EditEsu = () => {
    const { esuId } = useParams();
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { FormControl, esuInitialValues, editEsuSchema, esuGetState } = useEsuEditForm(esuId || "-1");
    const { sendRequestById } = useUpdateEsu();
    const { onSuccess } = useSuccessToast();
    const { onError } = useErrorToast();

    return (
        <ResourceCreateLayout
            formName="esuEditForm"
            title={t("esu.edit.heading")}
            addButtonLabel={t("esu.edit.update")}
        >
            {esuGetState === "error" || (!esuInitialValues && <Box>Error occurred</Box>)}
            {esuGetState === "pending" && (
                <Center>
                    <Spinner />
                </Center>
            )}

            {esuGetState === "success" && (
                <FormProvider
                    formId="esuEditForm"
                    schema={editEsuSchema}
                    formType="edit"
                    initialValues={esuInitialValues}
                    onEdit={(esuFormData) => {
                        const data: EsuUpdate = {
                            id: esuId!,
                            name: esuFormData.name,
                            type: esuFormData.type.value,
                            validFrom: esuFormData.validFrom ? esuFormData.validFrom.toISOString() : "",
                            validTo: esuFormData.validTo ? esuFormData.validTo.toISOString() : "",
                            batch: esuFormData.batch,
                            manufacturer: esuFormData.manufacturer,
                            serial: esuFormData.serial,
                            status: esuFormData.status.value,
                            technicalStatus: esuFormData.technicalStatus.value,
                            battery: esuFormData.battery?.value,
                            chargingCycles: esuFormData.chargingCycles,
                            chargingProfile: esuFormData.chargingProfile.value,
                            flightPermits: esuFormData.flightPermits.value,
                            location: esuFormData.location.value,
                            position: esuFormData.position,
                            usageCycles: esuFormData.usageCycles,
                            weight: esuFormData.weight,
                        };
                        sendRequestById(esuId || -1, { data })
                            .then((response) => {
                                if (response) {
                                    onSuccess(t("esu.edit.success"));
                                }
                            })
                            .catch((error: AxiosError<ResponseEnvelope<Esu>>) => {
                                if (error.response && error.response.data.error) {
                                    onError(error.response.data.error);
                                }
                            })
                            .finally(() => navigation(".."));
                    }}
                >
                    <FormControl fieldName="name" isNotEditable />
                    <FormControl fieldName="type" />
                    <FormControl fieldName="validFrom" />
                    <FormControl fieldName="validTo" />
                    <FormControl fieldName="batch" isNotEditable />
                    <FormControl fieldName="manufacturer" isNotEditable />
                    <FormControl fieldName="serial" isNotEditable />
                    <FormControl fieldName="status" />
                    <FormControl fieldName="technicalStatus" />
                    <FormControl fieldName="battery" isNotEditable />
                    <FormControl fieldName="chargingCycles" />
                    <FormControl fieldName="chargingProfile" />
                    <FormControl fieldName="flightPermits" />
                    <FormControl fieldName="location" />
                    <FormControl fieldName="position" />
                    <FormControl fieldName="usageCycles" />
                    <FormControl fieldName="weight" />
                </FormProvider>
            )}
        </ResourceCreateLayout>
    );
};
