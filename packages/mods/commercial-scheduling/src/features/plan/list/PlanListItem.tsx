import { Card, Divider, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { DateTimeRangeDisplay, PlanStatusTag } from "@voloiq/commercial-scheduling-components";
import { useNavigate } from "@voloiq/routing";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { PlanActionsPopover } from "./PlanActionsPopover";

type PlanListItemProps = {
    plan: Plan;
    reloadList: () => void;
};

export const PlanListItem = (props: PlanListItemProps) => {
    const { plan } = props;
    const { planName, regionName, status, commercialSchedule } = plan;
    const { validFrom, validTo, totalScheduleItems } = commercialSchedule ?? {};

    const canRead = useIsAuthorizedTo(["read"], ["CommercialPlan"]);
    const { t } = usePlanTranslation();
    const navigate = useNavigate();

    const navigateToDetails = () => {
        const { id } = plan;
        navigate(id);
    };

    return (
        <Card ariaLabel={planName} onClick={() => {}}>
            <HStack alignItems="flex-start" boxSize="full" width="100%">
                <VStack alignItems="flex-start" flex={1}>
                    <HStack spacing={3}>
                        <Text fontWeight="bold">{planName}</Text>
                        <Text>{regionName}</Text>
                    </HStack>
                    <DateTimeRangeDisplay label={t("overview.Valid From")} startDate={validFrom} endDate={validTo} />
                </VStack>
                <VStack alignItems="flex-end">
                    <HStack spacing={3}>
                        <PlanStatusTag status={status} />
                        <PlanActionsPopover {...props} />
                    </HStack>
                </VStack>
            </HStack>
            <Divider mt={2} mb={2} />
            <HStack alignItems="flex-start" boxSize="full" width="100%">
                <VStack alignItems="flex-start" flex={1}>
                    <HStack spacing={1}>
                        <Text>{totalScheduleItems}</Text>
                        <Text>{t("overview.Missions Ordered")}</Text>
                    </HStack>
                </VStack>
                <VStack alignItems="flex-end">
                    {canRead && (
                        <IconButton
                            aria-label={t("overview.detailAriaLabel")}
                            variant="ghost"
                            size="md"
                            onClick={navigateToDetails}
                        >
                            <Icon icon="chevronRight" />
                        </IconButton>
                    )}
                </VStack>
            </HStack>
        </Card>
    );
};
