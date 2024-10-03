import { CardList } from "@volocopter/design-library-react";
import type { FlightPlanInfo } from "@voloiq-typescript-api/flight-planning-types";
import { RequirePermissions } from "@voloiq/auth";
import { FlightPlanListEmpty } from "./FlightPlanListEmpty";
import { FlightPlanListItem } from "./FlightPlanListItem";

export type FlightPlanListProps = {
    flightPlans: FlightPlanInfo[];
    selectedId: string | undefined;
    setSelectedId: (id: string | undefined) => void;
};

export const FlightPlanList = (props: FlightPlanListProps) => {
    const { flightPlans, selectedId, setSelectedId } = props;
    return (
        <>
            {flightPlans.length === 0 ? (
                <FlightPlanListEmpty />
            ) : (
                <RequirePermissions resources={["FlightPlan"]} actions={["read"]}>
                    <CardList>
                        {flightPlans.map((flightPlan) => (
                            <FlightPlanListItem
                                key={flightPlan.id}
                                flightPlan={flightPlan}
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                            />
                        ))}
                    </CardList>
                </RequirePermissions>
            )}
        </>
    );
};
