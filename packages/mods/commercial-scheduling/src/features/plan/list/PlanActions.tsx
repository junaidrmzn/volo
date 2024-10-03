import { Button, Icon, useDisclosure } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Plan, useDeletePlan, useUpdatePlan } from "@voloiq/commercial-scheduling-api/v1";
import { EditPlanModal } from "../edit/EditPlanModal";
import { usePlanTranslation } from "../translations/usePlanTranslation";

type PlanActionsProps = {
    plan: Plan;
    reloadList: () => void;
};

export const ArchivePlanAction = (props: PlanActionsProps) => {
    const { plan, reloadList } = props;
    const { id, status } = plan;
    const canArchive = useIsAuthorizedTo(["update"], ["CommercialPlan"]);
    const { t } = usePlanTranslation();
    const { sendRequest } = useUpdatePlan(id);

    const archivePlan = () => {
        sendRequest({ data: { isArchived: true } }).then(() => {
            reloadList();
        });
    };

    return canArchive ? (
        <Button
            variant="ghost"
            size="md"
            leftIcon={<Icon icon="clock" />}
            isDisabled={status !== "DRAFT"}
            onClick={archivePlan}
        >
            {t("overview.actionButtons.Archive Plan")}
        </Button>
    ) : null;
};

export const DeletePlanAction = (props: PlanActionsProps) => {
    const { plan, reloadList } = props;
    const { id, status } = plan;
    const canDelete = useIsAuthorizedTo(["delete"], ["CommercialPlan"]);
    const { sendRequest } = useDeletePlan(id);
    const { t } = usePlanTranslation();

    const deletePlan = () => {
        sendRequest({}).then(() => {
            reloadList();
        });
    };

    return canDelete ? (
        <Button
            variant="ghost"
            size="md"
            leftIcon={<Icon icon="delete" />}
            isDisabled={status === "PUBLISHED"}
            onClick={deletePlan}
        >
            {t("overview.actionButtons.Delete Plan")}
        </Button>
    ) : null;
};

export const EditPlanAction = (props: PlanActionsProps) => {
    const { plan, reloadList } = props;
    const canUpdate = useIsAuthorizedTo(["update"], ["CommercialPlan"]);
    const { t } = usePlanTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return canUpdate ? (
        <>
            <Button variant="ghost" size="md" leftIcon={<Icon icon="penWithBox" />} onClick={onOpen}>
                {t("overview.actionButtons.Edit Plan")}
            </Button>
            <EditPlanModal plan={plan} isOpen={isOpen} closeModal={onClose} reloadList={reloadList} />
        </>
    ) : null;
};
