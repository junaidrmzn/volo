import type { BatteryCreate } from "@voloiq-typescript-api/battery-management-types";
import { FormProvider } from "@voloiq/form";
import { useNavigate } from "@voloiq/routing";
import { useCreateBattery } from "../../api-hooks/useBatteryService";
import { ResourceCreateLayout } from "../../components";
import { useErrorToast } from "../../hooks";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";
import { useBatteryCreateForm } from "./useBatteryCreateForm";

export const CreateBattery = () => {
    const { t } = useResourcesTranslation();
    const { FormControl, createBatterySchema } = useBatteryCreateForm();
    const navigation = useNavigate();
    const { sendRequest } = useCreateBattery();
    const { onError } = useErrorToast();
    const { onSuccess } = useSuccessToast();

    return (
        <ResourceCreateLayout formName="batteryCreateForm" title={t("battery.create.heading")}>
            <FormProvider
                formId="batteryCreateForm"
                schema={createBatterySchema}
                formType="create"
                initialValues={{ validFrom: new Date() }}
                onCreate={(batteryFormData) => {
                    const data: BatteryCreate = {
                        name: batteryFormData.name,
                        validFrom: batteryFormData.validFrom ? batteryFormData.validFrom.toISOString() : "",
                        validTo: batteryFormData.validTo ? batteryFormData.validTo.toISOString() : "",
                        actStatus: batteryFormData.actStatus.value,
                        flightPermits: batteryFormData.flightPermits.value,
                        location: batteryFormData.location.value,
                        technicalStatus: batteryFormData.technicalStatus.value,
                        batteryType: batteryFormData.batteryType.value,
                        maxCellVoltage: batteryFormData.maxCellVoltage,
                        minCellVoltage: batteryFormData.minCellVoltage,
                        nrEsu: batteryFormData.nrEsu,
                        nrChargingCycles: batteryFormData.nrChargingCycles,
                        nrUsageCycles: batteryFormData.nrUsageCycles,
                        weight: batteryFormData.weight,
                        firstUsageTime: batteryFormData.firstUsageTime
                            ? batteryFormData.firstUsageTime.toISOString()
                            : "",
                        lastChargeTime: batteryFormData.lastChargeTime
                            ? batteryFormData.lastChargeTime.toISOString()
                            : "",
                        maxChargingTime: batteryFormData.maxChargingTime,
                    };
                    sendRequest({ data })
                        .then((response) => {
                            if (response) {
                                onSuccess(t("battery.create.success"));
                            }
                        })
                        .catch((error) => {
                            onError(error);
                        })
                        .finally(() => navigation(".."));
                }}
            >
                <FormControl fieldName="name" />
                <FormControl fieldName="validFrom" />
                <FormControl fieldName="validTo" />
                <FormControl fieldName="actStatus" />
                <FormControl fieldName="flightPermits" />
                <FormControl fieldName="location" />
                <FormControl fieldName="technicalStatus" />
                <FormControl fieldName="batteryType" />
                <FormControl fieldName="maxCellVoltage" />
                <FormControl fieldName="minCellVoltage" />
                <FormControl fieldName="nrEsu" />
                <FormControl fieldName="nrChargingCycles" />
                <FormControl fieldName="nrUsageCycles" />
                <FormControl fieldName="weight" />
                <FormControl fieldName="firstUsageTime" />
                <FormControl fieldName="lastChargeTime" />
                <FormControl fieldName="maxChargingTime" />
            </FormProvider>
        </ResourceCreateLayout>
    );
};
