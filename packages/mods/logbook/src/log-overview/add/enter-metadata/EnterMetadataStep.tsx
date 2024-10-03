import { Center, Spinner } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import type { LogInsert } from "@voloiq/logbook-api/v6";
import { ErrorPanel } from "../../ErrorPanel";
import type { ProductLine } from "../select-aircraft/SelectProductLineStep";
import type { FilePrefillMetadata } from "../useCreateLogPage";
import { DateTimeReminderModal } from "./DateTimeReminderModal/DateTimeReminderModal";
import { MetadataFormFields } from "./MetadataFormFields";
import { useEnterMetadataStep } from "./useEnterMetadataStep";

type EnterMetadataStepProps = {
    setLogInsertData: (logInsert: LogInsert) => void;
    canEditDate: boolean;
    prefillMetadata?: FilePrefillMetadata;
    selectedProductLine: ProductLine;
};

export const EnterMetadataStep = (props: EnterMetadataStepProps) => {
    const { setLogInsertData, prefillMetadata, selectedProductLine, canEditDate } = props;

    const formId = "createLogForm";

    const {
        createLogSchema,
        state,
        crewMember: { crewMemberError },
        aircraft: { aircraftError },
        location: { locationError },
        onSubmitActions,
        setReminderModalData,
        reminderModalData,
    } = useEnterMetadataStep({ formId, selectedProductLine, setLogInsertData });

    if (state === "error") {
        // eslint-disable-next-line deprecation/deprecation
        return <ErrorPanel errors={[crewMemberError, aircraftError, locationError]} />;
    }
    if (state === "pending") {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    return (
        <>
            <DateTimeReminderModal
                isOpen={reminderModalData.isOpen}
                selectedDateTime={reminderModalData.selectedDateTime || new Date()}
                onClose={() => setReminderModalData((previousState) => ({ ...previousState, isOpen: false }))}
                setReminderHasBeenConfirmed={() =>
                    setReminderModalData((previousState) => ({ ...previousState, hasBeenConfirmed: true }))
                }
            />
            <FormProvider schema={createLogSchema} formType="create" onCreate={onSubmitActions} formId={formId}>
                <MetadataFormFields prefillMetadata={prefillMetadata} canEditDate={canEditDate} />
            </FormProvider>
        </>
    );
};
