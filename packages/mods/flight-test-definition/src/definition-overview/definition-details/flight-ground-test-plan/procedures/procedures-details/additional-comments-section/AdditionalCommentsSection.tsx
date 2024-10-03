import { useGetAllAdditionalComments } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceSection } from "@voloiq/flight-test-definition-components";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import { AdditionalCommentsSectionContent } from "./AdditionalCommentsSectionContent";
import { useAdditionalCommentsSectionTranslation } from "./translations/useAdditionalCommentsTranslation";
import { useAdditionalCommentsFormSchema } from "./useAdditionalCommentsFormSchema";
import { useAdditionalCommentsOnBulkOperations } from "./useAdditionalCommentsOnBulkOperations";

export type AdditionalCommentsSectionProps = {
    definitionId: string;
    procedureId: string;
};

export const AdditionalCommentsSection = (props: AdditionalCommentsSectionProps) => {
    const { definitionId, procedureId } = props;
    const { t } = useAdditionalCommentsSectionTranslation();
    const { formSchema } = useAdditionalCommentsFormSchema();
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();
    const { onBulkAddAdditionalComments, onBulkDeleteAdditionalComments, onBulkEditAdditionalComments } =
        useAdditionalCommentsOnBulkOperations({ definitionId, procedureId, editSessionId });
    const { getAllAdditionalComments } = useGetAllAdditionalComments({
        definitionId,
        procedureId,
        params: { size: 100_000 },
    });

    return (
        <BulkResourceSection
            formSchema={formSchema}
            resourceNameSingular={t("Additional Comment")}
            resourceNamePlural={t("Additional Comments")}
            renderFormControlGroup={(FormControl) => <FormControl fieldName="comment" />}
            renderResources={(additionalComments) => (
                <AdditionalCommentsSectionContent additionalComments={additionalComments} />
            )}
            onBulkAdd={onBulkAddAdditionalComments}
            onBulkDelete={onBulkDeleteAdditionalComments}
            onBulkEdit={onBulkEditAdditionalComments}
            getAllResources={getAllAdditionalComments}
            getInitialValues={(additionalComments) => additionalComments}
        />
    );
};
