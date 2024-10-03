import { useQueryClient } from "@tanstack/react-query";
import type { FTILink } from "@voloiq/flight-test-definition-api/v1";
import {
    getAllFtiLinksQueryKey,
    useBulkAddFtiLinks,
    useBulkDeleteFtiLinks,
    useBulkEditFtiLinks,
} from "@voloiq/flight-test-definition-api/v1";
import { useDefinitionEditSessionId } from "../../../../definition-edit-session-id-context/useDefinitionEditSessionId";
import type { CalculateFtiLinkSelectionOptions, SelectedFtiParameterMap } from "./ftiLinkSelections";
import { getAddedEntities, getDeletedIds, getEditedEntities } from "./ftiLinkSelections";

export type UseOnSubmitFtiParameterFormOptions = {
    definitionId: string;
    ftiLinks: FTILink[];
    selectedFtiParameterMap: SelectedFtiParameterMap;
};

export const useOnSubmitFtiParameterForm = (options: UseOnSubmitFtiParameterFormOptions) => {
    const { definitionId, ftiLinks, selectedFtiParameterMap } = options;

    const { bulkDeleteFtiLinks } = useBulkDeleteFtiLinks({ definitionId });
    const { bulkEditFtiLinks } = useBulkEditFtiLinks({ definitionId });
    const { bulkAddFtiLinks } = useBulkAddFtiLinks({ definitionId });
    const queryClient = useQueryClient();
    const { definitionEditSessionId: editSessionId } = useDefinitionEditSessionId();

    const onSubmit = async () => {
        const options: CalculateFtiLinkSelectionOptions = { initialFtiLinks: ftiLinks, selectedFtiParameterMap };
        const deletedIds = getDeletedIds(options);
        const addedEntities = getAddedEntities(options);
        const editedEntities = getEditedEntities(options);

        const promises = [];
        if (deletedIds.length > 0) {
            promises.push(bulkDeleteFtiLinks({ data: deletedIds, params: { editSessionId } }));
        }
        if (addedEntities.length > 0) {
            promises.push(bulkAddFtiLinks({ data: addedEntities, params: { editSessionId } }));
        }
        if (editedEntities.length > 0) {
            promises.push(bulkEditFtiLinks({ data: editedEntities, params: { editSessionId } }));
        }
        await Promise.all(promises);
        await queryClient.invalidateQueries(getAllFtiLinksQueryKey());
        await queryClient.invalidateQueries(["tabCounters"]);
    };

    return { onSubmit };
};
