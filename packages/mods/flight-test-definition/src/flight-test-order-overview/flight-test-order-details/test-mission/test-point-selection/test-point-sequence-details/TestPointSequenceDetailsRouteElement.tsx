import { Skeleton } from "@volocopter/design-library-react";
import { P, match } from "ts-pattern";
import { NotFoundPage } from "@voloiq/error-views";
import { useGetTestPointSequenceQuery } from "@voloiq/flight-test-definition-api/v1";
import { useNavigate, useParams } from "@voloiq/routing";
import { TestPointSequenceDetails } from "./TestPointSequenceDetails";

export const TestPointSequenceDetailsRouteElement = () => {
    const { flightTestOrderId = "", testPointSequenceId = "" } = useParams();
    const { testPointSequence, isLoading } = useGetTestPointSequenceQuery({ flightTestOrderId, testPointSequenceId });
    const navigate = useNavigate();

    return match({ testPointSequence, isLoading })
        .with({ isLoading: true }, () => <Skeleton width="full" height={5} />)
        .with({ testPointSequence: P.nullish }, () => <NotFoundPage />)
        .with({ testPointSequence: P.not(P.nullish) }, (props) => (
            <TestPointSequenceDetails
                testPointSequence={props.testPointSequence}
                onReturnMarkerClick={() => navigate(-1)}
            />
        ))
        .exhaustive();
};
