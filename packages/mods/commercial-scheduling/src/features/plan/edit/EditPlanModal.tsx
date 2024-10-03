import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { EditPlanForm } from "./EditPlanForm";

type EditPlanModalProps = {
    plan: Plan;
    isOpen: boolean;
    closeModal: () => void;
    reloadList: () => void;
};

export const EditPlanModal = (props: EditPlanModalProps) => {
    const { plan, isOpen, closeModal, reloadList } = props;
    const { t } = usePlanTranslation();

    return (
        <CommercialSchedulingModal
            heading={t("edit.heading")}
            subHeading={t("modal.Commercial Plan")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <EditPlanForm plan={plan} closeModal={closeModal} reloadList={reloadList} />
        </CommercialSchedulingModal>
    );
};
