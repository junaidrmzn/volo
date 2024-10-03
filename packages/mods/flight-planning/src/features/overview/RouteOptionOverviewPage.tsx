import { MapFocusController } from "@voloiq/map";
import { useParams } from "@voloiq/routing";
import { useGetRoutes } from "../../api-hooks";
import { ErrorPage, LoadingSpinner } from "../../components";
import { FlightStatusProvider } from "../../contexts/flight-status";
import { SegmentEditingProvider } from "../map-route-layer/segment-editing";
import { SelectedRouteSequenceIndexProvider } from "../selected-route-sequence-index";
import { RouteOptionOverview } from "./RouteOptionOverview";

export const RouteOptionOverviewPage = (props: { preserveDrawingBuffer?: boolean }) => {
    const { preserveDrawingBuffer } = props;
    const { routeOptionId } = useParams();
    const routesQuery = useGetRoutes(routeOptionId, true, !!routeOptionId);

    if (routesQuery.isError) {
        return <ErrorPage error={routesQuery.error.message} />;
    }

    if (routesQuery.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {routesQuery.isSuccess && (
                <MapFocusController>
                    <SegmentEditingProvider>
                        <SelectedRouteSequenceIndexProvider>
                            <FlightStatusProvider>
                                <RouteOptionOverview preserveDrawingBuffer={preserveDrawingBuffer} />
                            </FlightStatusProvider>
                        </SelectedRouteSequenceIndexProvider>
                    </SegmentEditingProvider>
                </MapFocusController>
            )}
        </>
    );
};
