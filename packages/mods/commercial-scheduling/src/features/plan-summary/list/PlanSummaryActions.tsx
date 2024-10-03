import { Icon, IconButton } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { PlanSummary, useDeletePlanSummaries } from "@voloiq/commercial-scheduling-api/v1";
import { EditPlanSummary } from "../edit/EditPlanSummary";

type PlanSummaryActionsProps = {
    planSummary: PlanSummary;
    reloadList: () => void;
    reloadPlan: () => void;
};

const DeletePlanSummaryAction = (props: PlanSummaryActionsProps) => {
    const { reloadList, reloadPlan, planSummary } = props;
    const { sendRequest } = useDeletePlanSummaries();

    const onDelete = () => {
        sendRequest({ data: { ids: [{ id: planSummary.id }] } }).then(() => {
            reloadList();
            reloadPlan();
        });
    };

    return (
        <IconButton aria-label="deletePlanSummary" variant="ghost" size="md" onClick={onDelete}>
            <Icon icon="delete" />
        </IconButton>
    );
};

export const PlanSummaryActions = (props: PlanSummaryActionsProps) => {
    const { planSummary } = props;
    const { scheduleItemConnectionStatus: connectionStatus, isDeleted, isCustomScheduleItemDeletionReq } = planSummary;
    const isPlanSummaryDeletion = isDeleted || isCustomScheduleItemDeletionReq;

    const canUpdate = useIsAuthorizedTo(["update"], ["PlanSummary"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["PlanSummary"]);

    return match(connectionStatus)
        .when(
            () => isPlanSummaryDeletion,
            () => null
        )
        .with("CONSISTENT", () => <>{canUpdate && <EditPlanSummary {...props} />}</>)
        .with("INCONSISTENT", () => <>{canDelete && <DeletePlanSummaryAction {...props} />}</>)
        .otherwise(() => null);
};
