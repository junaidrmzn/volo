import { useGetChangeLogDetailsQuery } from "@voloiq/flight-test-definition-api/v1";
import {
    FlightTestDefinitionChangesOverview,
    isFlightTestDefinitionChangesOverview,
} from "@voloiq/flight-test-definition-api/v2";
import { useNavigate } from "@voloiq/routing";
import { FlightTestDefinitionChangesReview } from "./FlightTestDefinitionChangesReview";

export type FlightTestDefinitionChangeLogWrapperProps = {
    definitionId: string;
    referenceId: string;
};

export const FlightTestDefinitionChangeLogWrapper = (props: FlightTestDefinitionChangeLogWrapperProps) => {
    const { definitionId, referenceId } = props;
    const { changeLog } = useGetChangeLogDetailsQuery({ definitionId, referenceId });
    const navigate = useNavigate();

    const flightTestDefinitionOverview = isFlightTestDefinitionChangesOverview(changeLog?.entity)
        ? // eslint-disable-next-line no-type-assertion/no-type-assertion
          (changeLog?.entity as FlightTestDefinitionChangesOverview)
        : undefined;

    if (!flightTestDefinitionOverview) {
        return null;
    }

    const navigateBack = () =>
        navigate({
            pathname: `/flight-test-definition/overview/${definitionId}`,
        });

    return (
        <FlightTestDefinitionChangesReview
            flightTestDefinitionOverview={flightTestDefinitionOverview}
            navigateBack={navigateBack}
        />
    );
};
