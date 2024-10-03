import { SplitViewLayout, Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import type { Aircraft } from "@voloiq/aircraft-management-api/v1";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import { TimeScheduler, TimeSchedulerRow, TimeSchedulerRowContent, TimeSchedulerRowItem } from "@voloiq/time-scheduler";
import { useEventForDisplay } from "../../hooks/useEventForDisplay";
import { useAircraftTranslation } from "../translations/useAircraftTranslation";
import { AircraftDetailTabGeneral } from "./AircraftDetailTabGeneral";
import { AircraftEventCard } from "./AircraftEventCard";
import { ExpandedEvent } from "./ExpandedEvent";
import { useActiveTab } from "./useActiveTabs";
import { WorkOrdersTab } from "./work-orders/WorkOrdersTab";

type aircraftProps = { aircraft: Aircraft };

export const AircraftDetail = (props: aircraftProps) => {
    const { aircraft: aircraftForDisplay } = props;

    const { events: aircraftEventMap, onRangeUpdate } = useEventForDisplay(aircraftForDisplay);

    const { t } = useAircraftTranslation();

    const { defaultIndex, handleTabChange } = useActiveTab();

    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("Scroll left"),
        scrollRightButtonLabel: t("Scroll right"),
        zoomInButtonLabel: t("Zoom in"),
        zoomOutButtonLabel: t("Zoom out"),
        closeButton: t("closeButton"),
        title: t("title"),
        go: t("go"),
    };

    return (
        <SplitViewLayout>
            <SplitViewLayout.Top>
                <TimeScheduler
                    translations={translations}
                    config={{ renderExpandedItems: (items) => <ExpandedEvent itemCount={items.length} /> }}
                    onRangeUpdate={onRangeUpdate}
                >
                    <TimeSchedulerRow>
                        <TimeSchedulerRowContent>
                            {aircraftEventMap[0]?.reservations?.map((event) => {
                                return (
                                    <TimeSchedulerRowItem
                                        key={event.id}
                                        id={event.id}
                                        startDate={new Date(event.startDateTime)}
                                        endDate={new Date(event.endDateTime)}
                                    >
                                        <AircraftEventCard event={event} />
                                    </TimeSchedulerRowItem>
                                );
                            })}
                        </TimeSchedulerRowContent>
                    </TimeSchedulerRow>
                </TimeScheduler>
            </SplitViewLayout.Top>
            <SplitViewLayout.Bottom>
                <Tabs defaultIndex={defaultIndex} onChange={handleTabChange}>
                    <TabList width="fit-content">
                        <Tab>{t("detail.tabs.general")}</Tab>
                        <Tab>{t("detail.tabs.maintenance")}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {aircraftForDisplay && <AircraftDetailTabGeneral aircraft={aircraftForDisplay} />}
                        </TabPanel>
                        <TabPanel>
                            <WorkOrdersTab aircraftId={aircraftForDisplay.id} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </SplitViewLayout.Bottom>
        </SplitViewLayout>
    );
};
