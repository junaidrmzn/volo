import {
    useBulkDeleteSpecialComments,
    useBulkEditSpecialComments,
    useGetAllSpecialComments,
    useOnBulkAddSpecialComments,
} from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceSection } from "@voloiq/flight-test-definition-components";
import { useDefinition } from "../../definition-context/useDefinition";
import { useDefinitionEditSessionId } from "../../definition-edit-session-id-context/useDefinitionEditSessionId";
import { SpecialCommentsCardList } from "./special-comments-card-list/SpecialCommentsCardList";
import { useSpecialCommentsTranslation } from "./translations/useSpecialCommentsTranslation";
import { useSpecialCommentFormSchema } from "./useSpecialCommentFormSchema";

export const SpecialCommentsSection = () => {
    const {
        definition: { id: definitionId },
    } = useDefinition();
    const { definitionEditSessionId } = useDefinitionEditSessionId();
    const { t } = useSpecialCommentsTranslation();
    const { specialCommentFormSchema } = useSpecialCommentFormSchema();
    const { getAllSpecialComments } = useGetAllSpecialComments({ definitionId });
    const { onBulkAddSpecialComments } = useOnBulkAddSpecialComments({ definitionId });
    const { onBulkEditSpecialComments } = useBulkEditSpecialComments({ definitionId });
    const { onBulkDeleteSpecialComments } = useBulkDeleteSpecialComments({ definitionId });

    return (
        <BulkResourceSection
            resourceNamePlural={t("Special Comments")}
            resourceNameSingular={t("Special Comment")}
            formSchema={specialCommentFormSchema}
            onBulkAdd={(data) => onBulkAddSpecialComments(data, definitionEditSessionId)}
            onBulkEdit={(data) => onBulkEditSpecialComments(data, definitionEditSessionId)}
            onBulkDelete={(data) => onBulkDeleteSpecialComments(data, definitionEditSessionId)}
            getAllResources={getAllSpecialComments}
            renderResources={(specialComments) => <SpecialCommentsCardList specialComments={specialComments} />}
            renderFormControlGroup={(FormControl) => <FormControl fieldName="comment" />}
            getInitialValues={(specialComments) => specialComments}
        />
    );
};
