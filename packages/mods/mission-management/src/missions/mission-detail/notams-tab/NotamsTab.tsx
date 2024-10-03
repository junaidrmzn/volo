import { VStack } from "@volocopter/design-library-react";
import type { Mission } from "@voloiq/network-schedule-management-api/v1";
import { MapRouteOption } from "@voloiq/network-scheduling-components";
import { NotamsList } from "./NotamsList";
import { useNotamsTabTranslation } from "./translations/useNotamsTabTranslation";

type NotamsTabProps = {
    mission: Mission;
};

export const NotamsTab = (props: NotamsTabProps) => {
    const { mission } = props;
    const { t } = useNotamsTabTranslation();

    return (
        <VStack spacing={3} width="full" alignItems="stretch">
            {mission.assignments?.routeOptionId && (
                <MapRouteOption routeOptionId={`${mission.assignments?.routeOptionId}`} isInitiallyShown />
            )}
            <NotamsList
                notam={mission.notam}
                getHeading={(numberOfNotams) => t("NOTAMs ({numberOfNotams})", { numberOfNotams })}
            />
        </VStack>
    );
};
