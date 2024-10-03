import {
    Box,
    Divider,
    Flex,
    HStack,
    Header,
    HeaderLayout,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@volocopter/design-library-react";
import { CheckListCategory, Service, StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { useGetAllDelayCodesQuery } from "@voloiq/network-schedule-management-api/v1";
import { TagWithTooltip } from "@voloiq/network-scheduling-components";
import { SynchronizedWithLeonTag } from "../SynchronizedWithLeonTag";
import { MissionDates } from "../mission-list-item/MissionDates";
import { ActionsPopover } from "../mission-list-item/mission-actions-popover/ActionsPopover";
import { ActionsPopoverProvider } from "../mission-list-item/mission-actions-popover/popover-context/ActionsPopoverProvider";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { AlertStatusIconWithCategory } from "./AlertStatusIconWithCategory";
import { MissionDetailTabAssignments } from "./MissionDetailTabAssignments";
import { AircraftTab } from "./aircraft-tab/AircraftTab";
import { CrewTab } from "./crew-tab/CrewTab";
import { DispatcherNotes } from "./dispatcher-notes/DispatcherNotes";
import { FlightPlanTab } from "./flight-plan-tab/FlightPlanTab";
import { GeneralTab } from "./general-tab/GeneralTab";
import { GroundOpsTab } from "./ground-ops-tab/GroundOpsTab";
import { NotamsTab } from "./notams-tab/NotamsTab";
import { PassangerTab } from "./passanger-tab/PassangerTab";
import { useMissionDetailTranslation } from "./translations/useMissionDetailTranslation";
import { TabConfig, useActiveTab } from "./useActiveTabs";
import { useConditionalRouteOption } from "./useConditionalRouteOption";
import { useMissionDetail } from "./useMissionDetail";
import { usePolling } from "./usePolling";
import { WeatherTab } from "./weather-tab/WeatherTab";

type MissionDetailProps = {
    pollingInterval?: number;
};

export const MissionDetail = (props: MissionDetailProps) => {
    const { pollingInterval = 30_000 } = props;
    const { t } = useMissionTranslations();
    const { data: delayCodes } = useGetAllDelayCodesQuery({ isEnabled: true });
    // To foster orthogonal code design, every folder should have its own translation folder
    // The above translation hook has already been used for this file, but should be moved to the below hook, hence the two hooks in here
    const { t: missionDetailT } = useMissionDetailTranslation();
    const { navigateBack, mission, refetchData, setMessageSubmitted, handleTabChange, activeTab } = useMissionDetail();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (isFeatureFlagEnabled("vao-2357")) usePolling(refetchData, pollingInterval);

    const { routeOption } = useConditionalRouteOption(mission?.assignments?.routeOptionId);

    const tabs: TabConfig[] = [
        { name: "overview", condition: true },
        { name: "passenger", condition: mission?.service === Service.PASSENGER },
        { name: "aircraft", condition: true },
        { name: "crew", condition: true },
        { name: "groundOperations", condition: isFeatureFlagEnabled("vao-1207") },
        { name: "flightPlan", condition: isFeatureFlagEnabled("vao-1596") },
        { name: "notams", condition: isFeatureFlagEnabled("vao-1808") },
        { name: "weather", condition: isFeatureFlagEnabled("vao-1806") },
        { name: "assignments", condition: true },
    ];

    const { defaultIndex, handleTabChange: changeQueryParamChange } = useActiveTab(tabs);

    const onTabChange = (index: number) => {
        handleTabChange(index);
        changeQueryParamChange(index);
    };

    const delayReasons =
        delayCodes
            ?.filter((delayCode) => mission?.delayCodes?.includes(delayCode.code))
            .map((delayCode) => `${delayCode.code} - ${delayCode.description} (${delayCode.delayCategory})`)
            .join(", ") || "";

    return mission ? (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    parentTitle={t("Mission")}
                    title={mission.flightNumber || ""}
                    hasReturnMarker
                    onClick={navigateBack}
                    returnMarkerAriaLabel="Back"
                />
                <Header.Controls>
                    <HStack spacing={3} flex={1}>
                        {mission.synchronizedWithLeon && <SynchronizedWithLeonTag />}
                        <TagWithTooltip
                            placement="top"
                            colorScheme="blue"
                            tooltipLabel={
                                mission.cancellationDescription && `${t("Reason")}: ${mission.cancellationDescription}`
                            }
                            tagContent={mission.statusOfMission}
                        />
                        <ActionsPopoverProvider>
                            <ActionsPopover mission={mission} onReloadList={refetchData} />
                        </ActionsPopoverProvider>
                    </HStack>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content>
                <VStack spacing={0} alignItems="flex-start">
                    <HStack>
                        <Text fontSize="sm">{mission.departureVertiportCode}</Text>
                        <Icon icon="arrowRight" size={4} marginLeft={2} marginRight={2} />
                        <Text fontSize="sm" as={mission.statusOfMission === StatusOfMission.DIVERTED ? "s" : "samp"}>
                            {mission.arrivalVertiportCode}
                        </Text>
                        {mission.statusOfMission === StatusOfMission.DIVERTED && (
                            <>
                                <Icon color="red.500" icon="warning" size={4} />
                                <Text fontSize="sm" color="red.500">
                                    {mission.actualArrivalVertiportCode}
                                </Text>
                            </>
                        )}
                    </HStack>
                    <MissionDates mission={mission} delayReasons={delayReasons} />
                </VStack>
                <Flex width="100%" mt={6} gap={3} p={3} alignItems="flex-start" backgroundColor="bgNavigationLayer1">
                    <HStack width="70%">
                        <Box width="100%">
                            <Tabs
                                variant="menu"
                                size="md"
                                orientation="vertical"
                                onChange={onTabChange}
                                defaultIndex={defaultIndex}
                            >
                                <TabList>
                                    <Tab>
                                        {t("Overview")}
                                        <AlertStatusIconWithCategory
                                            categoryName={CheckListCategory.GENERAL}
                                            checkLists={mission.checkLists}
                                        />
                                    </Tab>
                                    <Divider />
                                    {mission.service === Service.PASSENGER && (
                                        <Tab>
                                            {t("Passenger")}
                                            <AlertStatusIconWithCategory
                                                categoryName={CheckListCategory.PASSENGER}
                                                checkLists={mission.checkLists}
                                            />
                                        </Tab>
                                    )}
                                    <Tab>
                                        {t("aircraft")}
                                        <AlertStatusIconWithCategory
                                            categoryName={CheckListCategory.AIRCRAFT}
                                            checkLists={mission.checkLists}
                                        />
                                    </Tab>
                                    <Tab>
                                        {t("crew")}
                                        <AlertStatusIconWithCategory
                                            categoryName={CheckListCategory.CREW}
                                            checkLists={mission.checkLists}
                                        />
                                    </Tab>
                                    {isFeatureFlagEnabled("vao-1207") && (
                                        <Tab>
                                            {t("groundOperations")}
                                            <AlertStatusIconWithCategory
                                                categoryName={CheckListCategory.GROUND_OPERATION}
                                                checkLists={mission.checkLists}
                                            />
                                        </Tab>
                                    )}
                                    {isFeatureFlagEnabled("vao-1596") && (
                                        <Tab>
                                            {missionDetailT("Flight Plan")}
                                            <AlertStatusIconWithCategory
                                                categoryName={CheckListCategory.FLIGHT_PLAN}
                                                checkLists={mission.checkLists}
                                            />
                                        </Tab>
                                    )}
                                    {isFeatureFlagEnabled("vao-1808") && (
                                        <Tab>
                                            {missionDetailT("NOTAMs")}
                                            <AlertStatusIconWithCategory
                                                categoryName={CheckListCategory.NOTAMS}
                                                checkLists={mission.checkLists}
                                            />
                                        </Tab>
                                    )}
                                    {isFeatureFlagEnabled("vao-1806") && (
                                        <Tab>
                                            {missionDetailT("Weather")}
                                            <AlertStatusIconWithCategory
                                                categoryName={CheckListCategory.WEATHER}
                                                checkLists={mission.checkLists}
                                            />
                                        </Tab>
                                    )}
                                    <Tab>{t("Assignments")}</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <GeneralTab
                                            mission={mission}
                                            onReloadList={refetchData}
                                            routeOption={routeOption}
                                            delayReasons={delayReasons}
                                        />
                                    </TabPanel>
                                    {mission.service === Service.PASSENGER && (
                                        <TabPanel>
                                            <PassangerTab mission={mission} onReloadList={refetchData} />
                                        </TabPanel>
                                    )}
                                    <TabPanel>
                                        <AircraftTab mission={mission} onReloadList={refetchData} />
                                    </TabPanel>
                                    <TabPanel>
                                        <CrewTab mission={mission} onReloadList={refetchData} />
                                    </TabPanel>
                                    {isFeatureFlagEnabled("vao-1207") && (
                                        <TabPanel>
                                            <GroundOpsTab mission={mission} onReloadList={refetchData} />
                                        </TabPanel>
                                    )}
                                    {isFeatureFlagEnabled("vao-1596") && (
                                        <TabPanel>
                                            <FlightPlanTab mission={mission} onReloadList={refetchData} />
                                        </TabPanel>
                                    )}
                                    {isFeatureFlagEnabled("vao-1808") && (
                                        <TabPanel>
                                            <NotamsTab mission={mission} />
                                        </TabPanel>
                                    )}
                                    {isFeatureFlagEnabled("vao-1806") && (
                                        <TabPanel>
                                            <WeatherTab mission={mission} onReloadList={refetchData} />
                                        </TabPanel>
                                    )}
                                    <TabPanel>
                                        <MissionDetailTabAssignments mission={mission} routeOption={routeOption} />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </HStack>
                    <HStack width="30%">
                        <DispatcherNotes
                            mission={mission}
                            onMessageSubmitted={setMessageSubmitted}
                            activeTab={activeTab}
                        />
                    </HStack>
                </Flex>
            </HeaderLayout.Content>
        </HeaderLayout>
    ) : null;
};
