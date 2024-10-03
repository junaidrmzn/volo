/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Center, Spinner } from "@volocopter/design-library-react";
import type { ChargingProfileUpdate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate, useParams } from "@voloiq/routing";
import { useUpdateChargingProfile } from "../../api-hooks/useChargingProfileService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useChargingProfileEditForm } from "./useChargingProfileEditForm";

export const EditChargingProfile = () => {
    const { sendRequestById } = useUpdateChargingProfile();
    const { onError } = useErrorToast();
    const { chargingProfileId } = useParams();
    const { FormControl, chargingProfileInitialValues, editChargingProfileSchema, chargingProfileGetState } =
        useChargingProfileEditForm(chargingProfileId || "-1");
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { onSuccess } = useSuccessToast(false);

    return (
        <ResourceCreateLayout
            formName="chargingProfileEditForm"
            title={`${t("charging-profile.edit.heading")}: ${chargingProfileInitialValues.name}`}
            addButtonLabel={t("charging-profile.edit.update")}
        >
            {chargingProfileGetState === "error" || (!chargingProfileInitialValues && <Box>Error occurred</Box>)}
            {chargingProfileGetState === "pending" && (
                <Center>
                    <Spinner />
                </Center>
            )}

            {chargingProfileGetState === "success" && (
                <FormProvider
                    formId="chargingProfileEditForm"
                    schema={editChargingProfileSchema}
                    formType="edit"
                    initialValues={chargingProfileInitialValues}
                    onEdit={(chargingProfileFormData) => {
                        const data: ChargingProfileUpdate = {
                            id: chargingProfileId!,
                            name: chargingProfileFormData.name,
                            validFrom: chargingProfileFormData.validFrom
                                ? chargingProfileFormData.validFrom.toISOString()
                                : "",
                            validTo: chargingProfileFormData.validTo
                                ? chargingProfileFormData.validTo.toISOString()
                                : "",
                            currentCharMax: chargingProfileFormData.currentCharMax,
                            currentCharMin: chargingProfileFormData.currentCharMin,
                            currentDiscMax: chargingProfileFormData.currentDiscMax,
                            currentDiscMin: chargingProfileFormData.currentDiscMin,
                            tempCellMax: chargingProfileFormData.tempCellMax,
                            tempCellHigh: chargingProfileFormData.tempCellHigh,
                            tempCellLow: chargingProfileFormData.tempCellLow,
                            tempCellMin: chargingProfileFormData.tempCellMin,
                            voltageCellBal: chargingProfileFormData.voltageCellBal,
                            voltageCellMax: chargingProfileFormData.voltageCellMax,
                            voltageCellHigh: chargingProfileFormData.voltageCellHigh,
                            voltageCellLow: chargingProfileFormData.voltageCellLow,
                            voltageCellMin: chargingProfileFormData.voltageCellMin,
                            chargingType: chargingProfileFormData.chargingType.value,
                        };
                        sendRequestById(chargingProfileId || -1, { data })
                            .then((response) => {
                                if (response) {
                                    onSuccess(t("charging-profile.edit.success"));
                                }
                            })
                            .catch((error) => {
                                if (error.response && error.response.data.error) {
                                    onError(error.response.data.error);
                                }
                            })
                            .finally(() => navigation(".."));
                    }}
                >
                    <FormControl fieldName="name" isNotEditable />
                    <FormControl fieldName="validFrom" />
                    <FormControl fieldName="validTo" />
                    <FormControl fieldName="currentCharMax" />
                    <FormControl fieldName="currentCharMin" />
                    <FormControl fieldName="currentDiscMax" />
                    <FormControl fieldName="currentDiscMin" />
                    <FormControl fieldName="tempCellMax" />
                    <FormControl fieldName="tempCellHigh" />
                    <FormControl fieldName="tempCellLow" />
                    <FormControl fieldName="tempCellMin" />
                    <FormControl fieldName="voltageCellBal" />
                    <FormControl fieldName="voltageCellMax" />
                    <FormControl fieldName="voltageCellHigh" />
                    <FormControl fieldName="voltageCellLow" />
                    <FormControl fieldName="voltageCellMin" />
                    <FormControl fieldName="chargingType" />
                </FormProvider>
            )}
        </ResourceCreateLayout>
    );
};
