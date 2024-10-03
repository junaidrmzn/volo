import { Skeleton } from "@volocopter/design-library-react";
import { P, match } from "ts-pattern";
import { NotFoundPage } from "@voloiq/error-views";
import { useGetFlightTestOrderQuery } from "@voloiq/flight-test-definition-api/v2";
import { useNavigate, useParams } from "@voloiq/routing";
import { FlightTestOrderDetailsV2 } from "./FlightTestOrderDetailsV2";

export const FlightTestOrderDetailsRouteElementV2 = () => {
    const { flightTestOrderId = "" } = useParams();
    const { flightTestOrder, isLoading } = useGetFlightTestOrderQuery({ flightTestOrderId });
    const navigate = useNavigate();

    return match({ flightTestOrder, isLoading })
        .with({ isLoading: true }, () => <Skeleton width="full" height={5} />)
        .with({ flightTestOrder: P.nullish }, () => <NotFoundPage />)
        .with({ flightTestOrder: P.not(P.nullish) }, (props) => (
            <FlightTestOrderDetailsV2
                flightTestOrder={props.flightTestOrder}
                onReturnMarkerClick={() => navigate(-1)}
            />
        ))
        .exhaustive();
};
