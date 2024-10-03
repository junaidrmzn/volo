import { FormProvider } from "@voloiq/form";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { DivertMissionForm } from "./DivertMissionForm";
import { useDivertMissionForm } from "./useDivertMissionForm";

type DivertMissionProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
};

export const DivertMission = (props: DivertMissionProps) => {
    const { mission, onReloadList, onClose } = props;
    const { divertMissionFormSchema, onFormSubmit, initialValues } = useDivertMissionForm({
        mission,
        onReloadList,
    });

    return (
        <FormProvider
            schema={divertMissionFormSchema}
            formId="divertMissionForm"
            formType="create"
            onCreate={onFormSubmit}
            initialValues={initialValues}
        >
            <DivertMissionForm mission={mission} onClose={onClose} />
        </FormProvider>
    );
};
