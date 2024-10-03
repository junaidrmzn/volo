import { HStack, Icon, IconButton, useDisclosure } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useIsAuthorizedTo } from "@voloiq/auth";
import {
    PlanSummary,
    useApprovePlanSummary,
    useDeletePlanSummaryCustomization,
} from "@voloiq/commercial-scheduling-api/v1";
import { useParams } from "@voloiq/routing";
import { EditPlanSummaryModal } from "../edit/EditPlanSummaryModal";

export type PlanSummarySidePanelItemActionsProps = {
    planSummary: PlanSummary;
    refetchData: () => void;
};

const EditPlanSummarySidePanelItemAction = (props: PlanSummarySidePanelItemActionsProps) => {
    const { planSummary, refetchData } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="editCustomizationAction"
                variant="ghost"
                size="md"
                icon={<Icon icon="penWithBox" />}
                onClick={onOpen}
            />
            <EditPlanSummaryModal
                isOpen={isOpen}
                planSummary={planSummary}
                reload={refetchData}
                closeModal={onClose}
                overwrite={false}
            />
        </>
    );
};
const DeletePlanSummarySidePanelItemAction = (props: PlanSummarySidePanelItemActionsProps) => {
    const { planSummary, refetchData } = props;
    const { customCommercialScheduleItemId } = planSummary;
    const { sendRequest } = useDeletePlanSummaryCustomization(customCommercialScheduleItemId ?? "-1");

    const onDelete = () => {
        sendRequest({}).then(() => {
            refetchData();
        });
    };

    return (
        <IconButton
            aria-label="deleteCustomizationAction"
            variant="ghost"
            size="md"
            icon={<Icon icon="delete" />}
            onClick={onDelete}
        />
    );
};
const ApprovePlanSummarySidePanelItemAction = (props: PlanSummarySidePanelItemActionsProps) => {
    const { planSummary, refetchData } = props;
    const { planId } = useParams();
    const { sendRequest } = useApprovePlanSummary();
    const onApprove = () => {
        sendRequest({
            data: {
                commercialPlanId: planId ?? "-1",
                commercialScheduleItemCustomizations: [planSummary],
            },
        }).then(() => {
            refetchData();
        });
    };
    return (
        <IconButton
            aria-label="approveCustomizationAction"
            variant="ghost"
            size="md"
            icon={<Icon icon="check" />}
            onClick={onApprove}
        />
    );
};

const RejectPlanSummarySidePanelItemAction = (props: PlanSummarySidePanelItemActionsProps) => {
    const { planSummary, refetchData } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                aria-label="rejectCustomizationAction"
                variant="ghost"
                size="md"
                icon={<Icon icon="close" />}
                onClick={onOpen}
            />
            <EditPlanSummaryModal
                isOpen={isOpen}
                planSummary={planSummary}
                reload={refetchData}
                closeModal={onClose}
                overwrite
            />
        </>
    );
};

export const PlanSummarySidePanelItemActions = (props: PlanSummarySidePanelItemActionsProps) => {
    const { planSummary } = props;
    const { customItemStatus, isDeleted, isCustomScheduleItemDeletionReq } = planSummary;
    const isPlanSummaryDeletion: boolean = (isDeleted || isCustomScheduleItemDeletionReq) ?? false;

    const canUpdate = useIsAuthorizedTo(["update"], ["PlanSummaryCustomization"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["PlanSummaryCustomization"]);
    const canApprove = useIsAuthorizedTo(["approve"], ["PlanSummaryCustomization"]);
    const canReject = useIsAuthorizedTo(["reject"], ["PlanSummaryCustomization"]);

    return (
        <HStack alignItems="flex-end" alignSelf="stretch" justifyContent="flex-end">
            {match(customItemStatus)
                .with("DRAFT", () => {
                    return isPlanSummaryDeletion ? null : (
                        <>
                            {canUpdate && <EditPlanSummarySidePanelItemAction {...props} />}
                            {canDelete && <DeletePlanSummarySidePanelItemAction {...props} />}
                        </>
                    );
                })

                .with("AWAITING_APPROVAL", () => (
                    <>
                        {canReject &&
                            (!isPlanSummaryDeletion ? <RejectPlanSummarySidePanelItemAction {...props} /> : null)}
                        {canApprove && <ApprovePlanSummarySidePanelItemAction {...props} />}
                    </>
                ))
                .otherwise(() => null)}
        </HStack>
    );
};
