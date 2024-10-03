import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@volocopter/design-library-react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../translations";

type SnapDialogProps = {
    isOpen: boolean;
    onCancel: () => void;
    onBranchOff: () => void;
    onJoinOnwards: () => void;
    routeToJoin: Route | undefined;
};

export const SnapDialog = (props: SnapDialogProps) => {
    const { isOpen, onCancel, onBranchOff, onJoinOnwards, routeToJoin } = props;
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onCancel} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{translate("snapDialog.header")}</ModalHeader>
                <ModalBody>{translate("snapDialog.body", { route: routeToJoin?.name })}</ModalBody>
                <ModalFooter>
                    <Button onClick={onBranchOff} variant="primary" data-testid="snap-dialog-branchOff">
                        {translate("snapDialog.branchOff")}
                    </Button>
                    <Button onClick={onJoinOnwards} variant="primary" data-testid="snap-dialog-joinOnwards">
                        {translate("snapDialog.joinOnwards")}
                    </Button>
                    <Button onClick={onCancel} variant="secondary" data-testid="snap-dialog-cancel">
                        {translate("snapDialog.dontFollow")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
