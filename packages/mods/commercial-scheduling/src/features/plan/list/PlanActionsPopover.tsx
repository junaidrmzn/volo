import { Box, Icon, IconButton, Popover, Portal, VStack } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { ArchivePlanAction, DeletePlanAction, EditPlanAction } from "./PlanActions";

type PlanActionsPopoverProps = {
    plan: Plan;
    reloadList: () => void;
};

export const PlanActionsPopover = (props: PlanActionsPopoverProps) => {
    const { t } = usePlanTranslation();
    const canEdit = useIsAuthorizedTo(["update"], ["CommercialPlan"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["CommercialPlan"]);

    return (
        <Box
            onClick={(event) => {
                event.stopPropagation();
            }}
        >
            <Popover placement="auto">
                <Popover.Trigger>
                    <IconButton aria-label={t("overview.actionsAriaLabel")} variant="ghost" size="md">
                        <Icon icon="ellipsis" />
                    </IconButton>
                </Popover.Trigger>
                <Popover.Overlay />
                <Portal>
                    <Popover.Content>
                        <Popover.Body>
                            <VStack alignItems="flex-start" spacing={1}>
                                {canEdit && <ArchivePlanAction {...props} />}
                                {canEdit && <EditPlanAction {...props} />}
                                {canDelete && <DeletePlanAction {...props} />}
                            </VStack>
                        </Popover.Body>
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
