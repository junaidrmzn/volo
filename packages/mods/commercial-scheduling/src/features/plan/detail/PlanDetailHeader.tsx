import { Box, HStack, Header, HeaderLayout, Tag, Text } from "@volocopter/design-library-react";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { DateTimeRangeDisplay } from "@voloiq/commercial-scheduling-components";
import { usePlanStatus } from "@voloiq/commercial-scheduling-utils";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { ArchivePlan } from "./ArchivePlan";
import { PublishPlanModal } from "./PublishPlanModal";

type PlanDetailHeaderProps = {
    activeTabIndex: number;
    plan: Plan;
    navigateBack: () => void;
    refetchPlan: () => void;
};

const tabs = ["schedule", "pricing", "offering", "planSummary"] as const;

export const PlanDetailHeader = (props: PlanDetailHeaderProps) => {
    const { t } = usePlanTranslation();
    const { activeTabIndex, plan, navigateBack } = props;
    const { planName, regionName, status, commercialSchedule } = plan;
    const { validFrom, validTo, totalScheduleItems } = commercialSchedule ?? {};
    const { variant, text } = usePlanStatus({ status });
    const activeTab = tabs[activeTabIndex];

    return (
        <HStack width="full" justifyContent="space-between">
            <HeaderLayout>
                <HeaderLayout.Header>
                    <Header.Title
                        title={planName}
                        hasReturnMarker
                        returnMarkerAriaLabel={t("generic.back")}
                        onClick={navigateBack}
                        tag={<Tag colorScheme={variant}>{text}</Tag>}
                    />
                </HeaderLayout.Header>
                <HeaderLayout.Content alignWithTitle>
                    <Text>{regionName}</Text>
                    <DateTimeRangeDisplay startDate={validFrom} endDate={validTo} />
                </HeaderLayout.Content>
            </HeaderLayout>
            <Box alignItems="flex-start" height="full" p={6}>
                {activeTab === "planSummary" ? (
                    totalScheduleItems > 0 ? (
                        <PublishPlanModal {...props} />
                    ) : (
                        <ArchivePlan {...props} />
                    )
                ) : null}
            </Box>
        </HStack>
    );
};
