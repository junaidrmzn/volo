import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { usePlanTranslation } from "../translations/usePlanTranslation";
import { CreatePlanForm } from "./CreatePlanForm";
import { usePlanProcessProgress } from "./usePlanProcessProgress";

type CreatePlanModalProps = {
    isOpen: boolean;
    onClose: () => void;
    reloadList: () => void;
};

export const CreatePlanModal = (props: CreatePlanModalProps) => {
    const { isOpen, onClose, reloadList } = props;
    const { t } = usePlanTranslation();

    const { isUploadNewPlanInProgress, errorMessages, setProcessId, resetPlanProcessProgress } = usePlanProcessProgress(
        {
            reloadList,
            onClose,
        }
    );

    const closeModal = () => {
        if (!isUploadNewPlanInProgress) {
            onClose();
            resetPlanProcessProgress();
        }
    };

    return (
        <CommercialSchedulingModal
            heading={t("create.heading")}
            subHeading={t("modal.Commercial Plan")}
            isOpen={isOpen}
            onClose={closeModal}
        >
            <CreatePlanForm
                errorMessages={errorMessages}
                closeModal={closeModal}
                setProcessId={setProcessId}
                resetPlanProcessProgress={resetPlanProcessProgress}
                isLoading={isUploadNewPlanInProgress}
            />
        </CommercialSchedulingModal>
    );
};
