import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { useOutletContext } from "@voloiq/routing";
import { ErrorPage, LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";
import { useSelectedRoute } from "../selected-route";
import { NotamList } from "./NotamList";
import { NotamList as NotamListDeprecated } from "./__deprecated__/NotamList";

type NotamListWrapperSidebarContext = { closeRightSidebar: () => void };

export const NotamListWrapper = () => {
    const { closeRightSidebar } = useOutletContext<NotamListWrapperSidebarContext>();
    const { routeOptionId } = useSelectedRoute();
    const { isFeatureFlagEnabled } = useFeatureFlags();
    const { t: translate } = useFlightPlanningTranslation();

    const { data, isLoading, isError } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const { lat, lng } = data?.departureExternalVertiport || {};

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if ((!isLoading && isError) || !data || !lat || !lng) {
        return <ErrorPage error={translate("notam.error.message")} />;
    }

    return isFeatureFlagEnabled("vfp-1379") && routeOptionId ? (
        <NotamList routeOptionId={routeOptionId} latitude={lat} longitude={lng} closeRightSidebar={closeRightSidebar} />
    ) : (
        <NotamListDeprecated latitude={lat} longitude={lng} closeRightSidebar={closeRightSidebar} />
    );
};
