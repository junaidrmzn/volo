import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetAllTabCountersQuery, useGetDefinitionQuery } from "@voloiq/flight-test-definition-api/v2";
import { useLocation, useNavigate, useParams } from "@voloiq/routing";

export const useDefinitionDetail = () => {
    const { definitionId: definitionIdFromParams } = useParams();
    const { pathname } = useLocation();
    const pathnameArray = pathname.split("/");
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const definitionId = isFeatureFlagEnabled("vte-1596")
        ? definitionIdFromParams
        : pathnameArray[pathnameArray.indexOf("overview") + 1];

    if (definitionId === undefined) {
        throw new Error("parameters must be defined");
    }

    const { definition, refetchDefinition } = useGetDefinitionQuery({
        definitionId,
    });

    const { tabCounters } = useGetAllTabCountersQuery({ definitionId });

    const navigate = useNavigate();
    const navigateBack = () =>
        navigate({
            pathname: `/flight-test-definition/overview`,
        });

    return {
        navigateBack,
        definition,
        refetchDefinition,
        tabCounters,
    };
};
