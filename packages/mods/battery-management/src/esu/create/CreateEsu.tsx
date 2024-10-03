import type { Esu, EsuCreate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useCreateEsu } from "../../api-hooks/useEsuService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useEsuCreateForm } from "./useEsuCreateForm";

export const CreateEsu = () => {
    const { t } = useResourcesTranslation();
    const { FormControl, createEsuSchema } = useEsuCreateForm();
    const navigation = useNavigate();
    const { sendRequest } = useCreateEsu();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    return (
        <ResourceCreateLayout formName="esuCreateForm" title={t("esu.create.heading")}>
            <FormProvider
                formId="esuCreateForm"
                schema={createEsuSchema}
                formType="create"
                initialValues={{ validFrom: new Date() }}
                onCreate={(esuFormData) => {
                    const data: EsuCreate = {
                        name: esuFormData.name,
                        type: esuFormData.type.value,
                        validFrom: esuFormData.validFrom ? esuFormData.validFrom.toISOString() : "",
                        validTo: esuFormData.validTo ? esuFormData.validTo.toISOString() : "",
                        batch: esuFormData.batch,
                        manufacturer: esuFormData.manufacturer,
                        battery: esuFormData.battery?.value,
                        serial: esuFormData.serial,
                        status: esuFormData.status.value,
                        technicalStatus: esuFormData.technicalStatus.value,
                        chargingCycles: esuFormData.chargingCycles,
                        chargingProfile: esuFormData.chargingProfile.value,
                        flightPermits: esuFormData.flightPermits.value,
                        location: esuFormData.location.value,
                        position: esuFormData.position,
                        usageCycles: esuFormData.usageCycles,
                        weight: esuFormData.weight,
                    };
                    sendRequest({ data })
                        .then((response) => {
                            if (response) {
                                onSuccess(t("esu.create.success"));
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
                <FormControl fieldName="type" />
                <FormControl fieldName="validFrom" />
                <FormControl fieldName="validTo" />
                <FormControl fieldName="batch" />
                <FormControl fieldName="manufacturer" />
                <FormControl fieldName="serial" />
                <FormControl fieldName="status" />
                <FormControl fieldName="technicalStatus" />
                <FormControl fieldName="battery" />
                <FormControl fieldName="chargingCycles" />
                <FormControl fieldName="chargingProfile" />
                <FormControl fieldName="flightPermits" />
                <FormControl fieldName="location" />
                <FormControl fieldName="position" />
                <FormControl fieldName="usageCycles" />
                <FormControl fieldName="weight" />
            </FormProvider>
        </ResourceCreateLayout>
    );
};
