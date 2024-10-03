import { SplitViewLayout, Tab, TabList, TabPanel, TabPanels, Tabs } from "@volocopter/design-library-react";
import type { CrewMemberWithNames } from "@voloiq-typescript-api/crew-api-types/dist";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeSchedulerNew,
    TimeSchedulerRowContentNew,
    TimeSchedulerRowItemNew,
    TimeSchedulerRowLabelNew,
    TimeSchedulerRowNew,
} from "@voloiq/time-scheduler";
import { toLocalDate } from "@voloiq/utils";
import { useGetCrewMemberCalendar } from "../../api-hooks/useCrewManagementService";
import { EventItemOld } from "../../crewCalendar/events/EventItemOld";
import { useCrewApiTranslation } from "../../translations/useCrewApiTranslation";
import { CrewMemberDetailTabGeneral } from "./CrewMemberDetailTabGeneral";
import { CrewMemberDetailTabRoles } from "./CrewMemberDetailTabRoles";
import { CrewMemberLabel } from "./CrewMemberLabel";
import { ExpandedEvent } from "./ExpandedEvent";
import { useActiveTab } from "./useActiveTabs";

export type CrewMemberDetailsPageProps = {
    crewMember: CrewMemberWithNames;
};

export const CrewMemberDetail = (props: CrewMemberDetailsPageProps) => {
    const { crewMember: selectedCrewMember } = props;
    const { t } = useCrewApiTranslation();

    const pageSize = 1;
    const { data: crewMemberCalendar } = useGetCrewMemberCalendar(pageSize, selectedCrewMember.id);

    const { defaultIndex, handleTabChange } = useActiveTab();

    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("calendar.Scroll left"),
        scrollRightButtonLabel: t("calendar.Scroll left"),
        zoomInButtonLabel: t("calendar.Scroll left"),
        zoomOutButtonLabel: t("calendar.Scroll left"),
        closeButton: t("calendar.closeButton"),
        title: t("calendar.title"),
        go: t("calendar.go"),
    };

    return (
        <SplitViewLayout>
            <SplitViewLayout.Top>
                <TimeSchedulerNew
                    translations={translations}
                    config={{
                        renderExpandedItems: (items) => <ExpandedEvent itemCount={items.length} />,
                        persistSettings: true,
                        identifier: "crew-calendar",
                    }}
                >
                    <TimeSchedulerRowNew>
                        <TimeSchedulerRowLabelNew>
                            <CrewMemberLabel
                                crewMember={{
                                    id: selectedCrewMember.id,
                                    name: selectedCrewMember.firstName,
                                    surname: selectedCrewMember.surName,
                                    roles: selectedCrewMember.roleAssignments,
                                    homeBase: selectedCrewMember.homebaseName,
                                }}
                            />
                        </TimeSchedulerRowLabelNew>
                        <TimeSchedulerRowContentNew>
                            {crewMemberCalendar.length > 0 &&
                                crewMemberCalendar?.map((event) => (
                                    <TimeSchedulerRowItemNew
                                        key={event.id}
                                        id={event.id}
                                        startDate={toLocalDate(new Date(event.startTime))}
                                        endDate={toLocalDate(new Date(event.endTime))}
                                        group="event"
                                    >
                                        <EventItemOld
                                            eventName={event.title}
                                            isBlockedForMission={event.mission !== undefined}
                                        />
                                    </TimeSchedulerRowItemNew>
                                ))}
                        </TimeSchedulerRowContentNew>
                    </TimeSchedulerRowNew>
                </TimeSchedulerNew>
            </SplitViewLayout.Top>
            <SplitViewLayout.Bottom>
                <Tabs defaultIndex={defaultIndex} onChange={handleTabChange}>
                    <TabList width="fit-content">
                        <Tab>{t("detail.tabs.general")}</Tab>
                        <Tab>{t("detail.tabs.roles")}</Tab>
                        <Tab>{t("detail.tabs.other")}</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <CrewMemberDetailTabGeneral crewMember={selectedCrewMember} />
                        </TabPanel>
                        <TabPanel>
                            <CrewMemberDetailTabRoles crewMember={selectedCrewMember} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </SplitViewLayout.Bottom>
        </SplitViewLayout>
    );
};
