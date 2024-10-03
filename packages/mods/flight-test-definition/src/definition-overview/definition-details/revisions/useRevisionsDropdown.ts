import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetAllRevisionsQuery } from "@voloiq/flight-test-definition-api/v1";
import { useNavigate } from "@voloiq/routing";

type UseRevisionDropdownOptions = {
    definitionId: string;
    activeRevision?: string;
};

export const useRevisionsDropdown = (options: UseRevisionDropdownOptions) => {
    const { definitionId } = options;
    const navigate = useNavigate();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    const { revisions } = useGetAllRevisionsQuery({
        definitionId,
    });

    const navigateToRevision = (revisionValue?: string) => {
        const revision = revisions?.find((revision) => revision.revision === revisionValue);
        if (!revision?.released) {
            navigate(
                isFeatureFlagEnabled("vte-1596")
                    ? `/flight-test-suite/definitions/${definitionId}`
                    : `../overview/${definitionId}`
            );
        } else {
            navigate(
                isFeatureFlagEnabled("vte-1596")
                    ? `/flight-test-suite/definitions/${definitionId}/readonly/${revision?.revision}?entityType=flightTestDefinition`
                    : `../overview/${definitionId}/readonly/${revision?.revision}?entityType=flightTestDefinition`
            );
        }
    };

    return {
        revisions: revisions || [],
        navigateToRevision,
    };
};
