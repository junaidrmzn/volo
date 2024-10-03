import { useGetDefinitionRevisionQuery } from "@voloiq/flight-test-definition-api/v2";
import { useLocation, useNavigate } from "@voloiq/routing";
import { FlightTestDefinitionChangesReview } from "./FlightTestDefinitionChangesReview";

export type FlightTestDefinitionRevisionWrapperProps = {
    definitionId: string;
    revisionId: string;
};

export const FlightTestDefinitionRevisionWrapper = (props: FlightTestDefinitionRevisionWrapperProps) => {
    const { definitionId, revisionId } = props;
    const { definitionRevision } = useGetDefinitionRevisionQuery({ definitionId, revisionId });
    const navigate = useNavigate();
    const location = useLocation();

    const { goBackInHistory } = location.state ?? {};

    if (!definitionRevision) return null;

    const navigateBack = () =>
        goBackInHistory
            ? navigate(-1)
            : navigate({
                  pathname: `/flight-test-definition/overview`,
              });

    return (
        <FlightTestDefinitionChangesReview
            flightTestDefinitionOverview={definitionRevision}
            navigateBack={navigateBack}
            isRevisionView
        />
    );
};
