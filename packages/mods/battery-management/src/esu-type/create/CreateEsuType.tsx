import type { Esu, EsuTypeCreate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate } from "@voloiq/routing";
import type { AxiosError, ResponseEnvelope } from "@voloiq/service";
import { useGetAircraftTypes } from "../../api-hooks/useBatteryManagementAircraftTypeService";
import { useCreateEsuType } from "../../api-hooks/useEsuTypeService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useEsuTypeCreateForm } from "./useEsuTypeCreateForm";

export const CreateEsuType = () => {
    const { t } = useResourcesTranslation();
    const { FormControl, createEsuTypeSchema } = useEsuTypeCreateForm();
    const { data: aircraftTypes } = useGetAircraftTypes(1);
    const navigation = useNavigate();
    const { sendRequest } = useCreateEsuType();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    return (
        <ResourceCreateLayout formName="esuTypeCreateForm" title={t("esu-type.create.heading")}>
            <FormProvider
                formId="esuTypeCreateForm"
                schema={createEsuTypeSchema}
                formType="create"
                initialValues={{ validFrom: new Date() }}
                onCreate={(esuTypeFormData) => {
                    const aircraftTypesIds = new Set(esuTypeFormData.aircraftTypes.map((type) => type.value));
                    const data: EsuTypeCreate = {
                        name: esuTypeFormData.name,
                        manualCharging: esuTypeFormData.chargingMode.value === "manual",
                        aircraftTypes: aircraftTypes
                            .map((aircraftType) => aircraftType.id)
                            .filter((id) => aircraftTypesIds.has(id.toString())),
                        validFrom: esuTypeFormData.validFrom ? esuTypeFormData.validFrom.toISOString() : "",
                        validTo: esuTypeFormData.validTo ? esuTypeFormData.validTo.toISOString() : "",
                    };
                    sendRequest({ data })
                        .then((response) => {
                            if (response) {
                                onSuccess(t("esu-type.create.success"));
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
                <FormControl fieldName="chargingMode" />
                <FormControl fieldName="aircraftTypes" />
                <FormControl fieldName="validFrom" />
                <FormControl fieldName="validTo" />
            </FormProvider>
        </ResourceCreateLayout>
    );
};
