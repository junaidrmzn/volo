import { VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { TextCard } from "@voloiq/flight-test-definition-components";
import { useStepsSectionTranslation } from "./translations/useStepsSectionTranslation";

export type StepsSectionContentProps = {
    procedure: ProcedureRead;
};

export const StepsSectionContent = (props: StepsSectionContentProps) => {
    const { procedure } = props;
    const { t } = useStepsSectionTranslation();

    return (
        <VStack spacing={4} alignItems="stretch">
            {[
                [t("Setup"), procedure.stepSetup],
                [t("Procedure"), procedure.stepProcedure],
                [t("Recovery"), procedure.stepRecovery],
            ].map(([label, text]) => (
                <TextCard key={label} label={label} text={<EditorTextDisplay document={text} />} />
            ))}
        </VStack>
    );
};
