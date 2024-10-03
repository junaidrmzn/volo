import { useGetFlightPlans } from "../../api-hooks/flight-plan";
import { ErrorPage, LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations";
import { FlightPlanList } from "./FlightPlanList";
import { FlightPlanSidebar } from "./FlightPlanSidebar";
import { OverviewLayout } from "./components/OverviewLayout";
import { useFlightPlanOverview } from "./hooks";

export const FlightPlanOverview = () => {
    const flightPlanQuery = useGetFlightPlans();
    const { t } = useFlightPlanningTranslation();
    const { isOpen, selectedId, setSelectedId } = useFlightPlanOverview();

    if (flightPlanQuery.isError) {
        return <ErrorPage error={flightPlanQuery.error.message} />;
    }

    if (flightPlanQuery.isLoading) {
        return <LoadingSpinner />;
    }

    const routeOption = flightPlanQuery.data?.find((flightPlan) => flightPlan.externalId === selectedId)?.routeOption;
    const flightPlanName = `${routeOption?.departureExternalVertiport.name} - ${routeOption?.arrivalExternalVertiport.name}`;

    return (
        <OverviewLayout isOpen={isOpen}>
            <OverviewLayout.Page
                heading={t("flightPlanManagement.title")}
                subtitle={t("flightPlanManagement.subtitle")}
                state={flightPlanQuery.status}
            >
                {flightPlanQuery.isSuccess && (
                    <FlightPlanList
                        flightPlans={flightPlanQuery.data}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                    />
                )}
            </OverviewLayout.Page>
            <OverviewLayout.Menu setSelectedId={setSelectedId} title={flightPlanName || ""}>
                {selectedId && <FlightPlanSidebar selectedId={selectedId} />}
            </OverviewLayout.Menu>
        </OverviewLayout>
    );
};
