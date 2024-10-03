import { SplashLayout } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useFlightPlanningTranslation } from "../../translations";

export const FlightPlanListEmpty = () => {
    const { t } = useFlightPlanningTranslation();
    const navigation = useNavigate();
    return (
        <SplashLayout>
            <SplashLayout.Icon icon="search" />
            <SplashLayout.Heading text={t("flightPlanManagement.errors.emptyTitle")} />
            <SplashLayout.Description text={t("flightPlanManagement.errors.emptyText")} />
            <SplashLayout.Button onClick={() => navigation("../../flight-planning")}>
                {t("flightPlanManagement.errors.emptyButton")}
            </SplashLayout.Button>
        </SplashLayout>
    );
};
