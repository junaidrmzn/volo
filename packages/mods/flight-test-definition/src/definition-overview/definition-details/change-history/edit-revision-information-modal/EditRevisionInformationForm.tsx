import { useQueryClient } from "@tanstack/react-query";
import { HStack, VStack } from "@volocopter/design-library-react";
import React from "react";
import { RevisionPatch, useBulkEditRevisions, useGetAllRevisionsQuery } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceForm } from "@voloiq/flight-test-definition-components";
import { useReleaseRevisionFormSchema } from "../release-revision-modal/useReleaseRevisionFormSchema";

type EditRevisionInformationFormProps = {
    definitionId: string;
    onClose: () => void;
};

type RevisionWithId = RevisionPatch & { id: string };

export const EditRevisionInformationForm = (props: EditRevisionInformationFormProps) => {
    const { definitionId, onClose } = props;
    const schema = useReleaseRevisionFormSchema();
    const { revisions } = useGetAllRevisionsQuery({ definitionId });
    const { bulkEditRevisions } = useBulkEditRevisions({ definitionId });
    const queryClient = useQueryClient();

    const releasedRevisions = revisions?.filter((revision) => revision.released === true);

    const getInitialValues = () =>
        releasedRevisions?.map((revision) => ({
            id: revision.ftdId,
            revision: revision.revision,
            revisionDescription: revision.revisionDescription,
            date: revision.released_date ?? new Date(),
        }));

    const onBulkEditRevisions = async (revisions: RevisionWithId[]) => {
        await bulkEditRevisions({
            data: revisions?.map((revision) => ({
                id: revision.ftdId,
                revision: revision.revision,
                revision_description: revision.revisionDescription,
            })),
        });
    };

    const handleOnAfterSubmit = () => {
        queryClient.invalidateQueries(["revision"]);
        queryClient.invalidateQueries(["definition"]);
        onClose();
    };

    return (
        <BulkResourceForm
            entityName="Requirement"
            onAdd={() => Promise.resolve()}
            onDelete={() => Promise.resolve()}
            onEdit={onBulkEditRevisions}
            schema={schema}
            initialValues={getInitialValues()}
            onAfterSubmit={handleOnAfterSubmit}
            renderFormControlGroup={(FormControl) => (
                <VStack spacing={3}>
                    <HStack width="full">
                        <FormControl isNotEditable fieldName="revision" />
                        <FormControl isNotEditable fieldName="date" />
                    </HStack>
                    <FormControl fieldName="revisionDescription" />
                </VStack>
            )}
            withSubmitButton
            withDeleteButton={false}
            withAddNewButton={false}
        />
    );
};
