import { Service } from "@voloiq-typescript-api/network-scheduling-types";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { useMissionAddForm } from "./useMissionAddForm";

export type AddMissionFormProps = Pick<RenderAddHandlerProps, "formRef" | "onAfterSubmit" | "onSubmit">;
export const AddMissionForm = (props: AddMissionFormProps) => {
    const { onSubmit } = props;
    const { t } = useMissionTranslations();
    const {
        onCreate,
        onChangeServiceOption,
        service,
        onChangeDepartureVertiportOption,
        MissionFormControl,
        ...formProviderProps
    } = useMissionAddForm();
    return (
        <FormProvider
            formType="create"
            {...props}
            {...formProviderProps}
            onCreate={(...args) => {
                onSubmit();
                return onCreate(...args);
            }}
        >
            <MissionFormControl
                fieldName="service"
                onChange={onChangeServiceOption}
                additionalInfo={t("mission-management.additionalInfo.service")}
            />
            <MissionFormControl
                fieldName="flightNumber"
                additionalInfo={t("mission-management.additionalInfo.flightNumber")}
            />
            {service === Service.TEST && (
                <MissionFormControl
                    fieldName="ftoNumber"
                    additionalInfo={t("mission-management.additionalInfo.ftoNumber")}
                />
            )}
            <MissionFormControl
                fieldName="departureDateTime"
                additionalInfo={t("mission-management.additionalInfo.scheduledDeparture")}
            />
            <MissionFormControl
                fieldName="departureVertiport"
                additionalInfo={t("mission-management.additionalInfo.departureVertiport")}
                onChange={onChangeDepartureVertiportOption}
            />
            <MissionFormControl
                fieldName="arrivalDateTime"
                additionalInfo={t("mission-management.additionalInfo.scheduledArrival")}
            />
            <MissionFormControl
                fieldName="arrivalVertiport"
                additionalInfo={t("mission-management.additionalInfo.arrivalVertiport")}
            />
            <MissionFormControl
                fieldName="typeOfOperation"
                additionalInfo={t("mission-management.additionalInfo.typeOfOperation")}
            />
        </FormProvider>
    );
};
