import { pick } from "lodash";
import { useGetProcedureQuery, useOptimisticEditProcedure } from "@voloiq/flight-test-definition-api/v1";
import { ResourceSection } from "@voloiq/flight-test-definition-components";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { StepsFormControls } from "./StepsFormControls";
import { StepsSectionContent } from "./StepsSectionContent";
import { useStepsSectionTranslation } from "./translations/useStepsSectionTranslation";
import { useStepsSectionFormSchema } from "./useStepsSectionFormSchema";

export type StepsSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const StepsSection = (props: StepsSectionProps) => {
    const { procedureId, definitionId } = props;
    const { formSchema } = useStepsSectionFormSchema();
    const { t } = useStepsSectionTranslation();
    const { procedure } = useGetProcedureQuery({ definitionId, procedureId });
    const { optimisticEditProcedure } = useOptimisticEditProcedure({ definitionId, procedureId });
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();

    return (
        <ResourceSection
            formSchema={formSchema}
            resource={procedure}
            renderFormControls={(FormControl) => <StepsFormControls FormControl={FormControl} />}
            resourceNameSingular={t("Steps")}
            getInitialValues={(procedure) => pick(procedure, ["stepSetup", "stepProcedure", "stepRecovery"])}
            renderResource={(procedure) => <StepsSectionContent procedure={procedure} />}
            onEdit={async (procedure) => {
                await optimisticEditProcedure({ data: procedure, params: { editSessionId } });
            }}
        />
    );
};
