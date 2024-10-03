import { useGetFlightPlanByExternalId } from "../../api-hooks";
import { ErrorPage, LoadingSpinner } from "../../components";
import { FlightInformation } from "./FlightInformation";
import { FlightPlanActions } from "./FlightPlanActions";
import { FlightPlanLog } from "./FlightPlanLog";

type FlightPlanSidebarProps = {
    selectedId: string;
};

export const FlightPlanSidebar = (props: FlightPlanSidebarProps) => {
    const { selectedId } = props;

    const flightPlanQuery = useGetFlightPlanByExternalId(selectedId);

    if (flightPlanQuery.isLoading) return <LoadingSpinner />;

    if (flightPlanQuery.isError) return <ErrorPage error={flightPlanQuery.error.message} />;

    return (
        <>
            {flightPlanQuery.isSuccess && flightPlanQuery.data && (
                <>
                    <FlightInformation
                        version={flightPlanQuery.data.version}
                        aircraftType={flightPlanQuery.data.routeOption!.aircraftType}
                        arrivalVertiport={flightPlanQuery.data.routeOption!.arrivalExternalVertiport.name}
                        departureVertiport={flightPlanQuery.data.routeOption!.departureExternalVertiport.name}
                        scheduledArrivalTime={flightPlanQuery.data.scheduledArrivalTime}
                        scheduledDepartureTime={flightPlanQuery.data.scheduledDepartureTime}
                        targetActivationTime={flightPlanQuery.data.targetActivationTime}
                        planStage={flightPlanQuery.data.planStage}
                        conflictStatus={flightPlanQuery.data.conflictStatus}
                    />
                    <FlightPlanLog flightPlanId={flightPlanQuery.data.id!} />
                    <FlightPlanActions
                        flightPlan={flightPlanQuery.data}
                        planStage={flightPlanQuery.data.planStage}
                        conflictStatus={flightPlanQuery.data.conflictStatus}
                    />
                </>
            )}
        </>
    );
};
