import type { ChargingProfileCreate, Esu } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useCreateChargingProfile } from "../../api-hooks/useChargingProfileService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useChargingProfileCreateForm } from "./useChargingProfileCreateForm";

export const CreateChargingProfile = () => {
    const { t } = useResourcesTranslation();
    const { FormControl, createChargingProfileSchema } = useChargingProfileCreateForm();
    const navigation = useNavigate();
    const { sendRequest } = useCreateChargingProfile();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    return (
        <ResourceCreateLayout formName="chargingProfileCreateForm" title={t("charging-profile.create.heading")}>
            <FormProvider
                formId="chargingProfileCreateForm"
                schema={createChargingProfileSchema}
                formType="create"
                initialValues={{ validFrom: new Date() }}
                onCreate={(chargingProfileFormData) => {
                    const data: ChargingProfileCreate = {
                        name: chargingProfileFormData.name,
                        validFrom: chargingProfileFormData.validFrom
                            ? chargingProfileFormData.validFrom.toISOString()
                            : "",
                        validTo: chargingProfileFormData.validTo ? chargingProfileFormData.validTo.toISOString() : "",
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
                    sendRequest({ data })
                        .then((response) => {
                            if (response) {
                                onSuccess(t("charging-profile.create.success"));
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
                <FormControl fieldName="name" />
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
        </ResourceCreateLayout>
    );
};
