import { match } from "ts-pattern";
import { AxiosError } from "@voloiq/service";
import { useGetAllAircraft } from "../../libs/fti-api";
import { usePatchParameter } from "../../libs/fti-api/useParameter";
import {
    createOnlyMultiAircraftParameterPatchFromFormData,
    createParameterPatchFromFormData,
    useParameterFormData,
} from "../../libs/parameter-form";
import { EditParameterFormProps } from "../../libs/parameter-form/ParameterFormType";
import { EditParametersProps } from "./EditParameterType";
import { useAssignAircrafts } from "./useAssignAircrafts";

type UseEditParameterProps = Omit<EditParametersProps, "formRef"> & {};

export const useEditParameter = (props: UseEditParameterProps) => {
    const { resource, onSubmit, onSubmitError, onAfterSubmit } = props;
    const { sendRequest } = usePatchParameter(resource.id);

    const { data: aircrafts } = useGetAllAircraft();
    const {
        setIsEditModeEnabled,
        isEditModeEnabled,
        assignedAircrafts,
        onAircraftUpdate,
        onAssignAircraft,
        availableAircrafts,
    } = useAssignAircrafts({ aircrafts, resource });

    const { state: initialDataState, data } = useParameterFormData();
    const isLoading = initialDataState === "pending";

    const isParameterEditable = !resource.aircrafts.some(
        (aircraft) => aircraft.status === "RELEASED" || aircraft.status === "CANCELLED" || aircraft.status === "FROZEN"
    );

    const handleSubmit: EditParameterFormProps["onSubmit"] = (props) => {
        onSubmit();

        sendRequest({
            data: isParameterEditable
                ? createParameterPatchFromFormData(assignedAircrafts, props)
                : createOnlyMultiAircraftParameterPatchFromFormData(assignedAircrafts),
        })
            .then(() => onAfterSubmit())
            .catch((error: AxiosError) => {
                const errorKey = match(error.response?.data.error.status)
                    .with("ALREADY_EXISTS", () => "ALREADY_EXISTS" as const)
                    .otherwise(() => "GENERIC" as const);

                onSubmitError(errorKey);
            });
    };

    return {
        data,
        isLoading,
        handleSubmit,
        setIsEditModeEnabled,
        isEditModeEnabled,
        assignedAircrafts,
        onAircraftUpdate,
        onAssignAircraft,
        availableAircrafts,
        isParameterEditable,
    };
};
