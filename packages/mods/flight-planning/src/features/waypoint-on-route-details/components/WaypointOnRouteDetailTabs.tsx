import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import { Dispatch, SetStateAction } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import type { AnyObjectSchema } from "@voloiq/form";
import { VoloiqMapStoreType } from "@voloiq/map";
import { useFlightPlanningTranslation } from "../../../translations";
import { useSegmentEditingContext } from "../../map-route-layer/segment-editing";
import { RouteSegment } from "./RouteSegment";
import { WaypointOnRouteDetailsFormFields } from "./WaypointOnRouteDetailsFormFields";

type WaypointOnRouteDetailTabsProps = {
    isLastWaypoint: boolean;
    isEditable: boolean;
    createWaypointSchema: AnyObjectSchema;
    waypoint: Waypoint;
    routeId: number;
    setIsRefAltitudeSelected: Dispatch<SetStateAction<boolean>>;
    voloiqMapStore?: VoloiqMapStoreType;
};

export const WaypointOnRouteDetailTabs = (props: WaypointOnRouteDetailTabsProps) => {
    const {
        isLastWaypoint,
        isEditable,
        createWaypointSchema,
        waypoint,
        setIsRefAltitudeSelected,
        routeId,
        voloiqMapStore,
    } = props;
    const { setSegmentEditMode } = useSegmentEditingContext();
    const { t } = useFlightPlanningTranslation();

    const onTabChange = (index: number) => {
        if (index === 1) {
            if (waypoint.routeSegment) setSegmentEditMode("turn");
            else setSegmentEditMode("direct");
        } else setSegmentEditMode("none");
    };

    return (
        <Tabs size="sm" variant="underline" onChange={onTabChange}>
            <TabList>
                <Tab>{t("waypointDetails.waypoint")}</Tab>
                <Tab isDisabled={isLastWaypoint}>{t("waypointDetails.routeSegments")}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <WaypointOnRouteDetailsFormFields
                        isEditable={isEditable}
                        createWaypointSchema={createWaypointSchema}
                        selectedWaypoint={waypoint}
                        setIsRefAltitudeSelected={setIsRefAltitudeSelected}
                    />
                </TabPanel>
                <TabPanel>
                    <RouteSegment
                        selectedWaypoint={waypoint}
                        isEditable={isEditable}
                        routeSequenceIndex={waypoint.routeSequenceIndex}
                        routeId={routeId}
                        voloiqMapStore={voloiqMapStore}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
