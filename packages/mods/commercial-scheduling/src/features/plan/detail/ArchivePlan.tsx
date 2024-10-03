import { Button, useToast } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Plan, useUpdatePlan } from "@voloiq/commercial-scheduling-api/v1";
import { usePlanTranslation } from "../translations/usePlanTranslation";

type ArchivePlanProps = {
    plan: Plan;
    refetchPlan: () => void;
};

export const ArchivePlan = (props: ArchivePlanProps) => {
    const { plan, refetchPlan } = props;
    const { id } = plan;
    const canArchive = useIsAuthorizedTo(["update"], ["CommercialPlan"]);
    const { sendRequest } = useUpdatePlan(id);
    const { t } = usePlanTranslation();
    const toast = useToast();

    const archivePlan = () => {
        const title = t("overview.actionButtons.Archive Plan");
        sendRequest({ data: { isArchived: true } }).then(() => {
            toast({ title, status: "success", description: t("overview.planArchived") });
            refetchPlan();
        });
    };

    return canArchive ? (
        <Button variant="primary" onClick={archivePlan}>
            {t("overview.actionButtons.Archive Plan")}
        </Button>
    ) : null;
};
