import {
    Button,
    ButtonGroup,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@volocopter/design-library-react";
import { Mission, useAcceptMission } from "@voloiq/network-schedule-management-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

export type AcceptMissionModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
};

export const AcceptMissionModal = (props: AcceptMissionModalProps) => {
    const {
        isOpen = false,
        onClose,
        mission: { id: missionId, flightNumber, version },
        onReloadList,
    } = props;
    const { t } = useMissionTranslations();
    const { onError } = useErrorToastWithMessage();
    const { sendRequest } = useAcceptMission({
        missionId,
        config: { params: { version } },
    });
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={`${t("acceptMission.confirm")} -`}
                        modalTitle={t("acceptMission.acceptance")}
                    />
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <Text pt={3} pb={6} fontSize="sm">
                        {t("acceptMission.confirmationMessage", { mission: flightNumber })}
                    </Text>
                    <Flex justifyContent="flex-end">
                        <ButtonGroup isAttached>
                            <Button variant="secondary" size="md" onClick={onClose}>
                                {t("buttons.no")}
                            </Button>
                            <Button
                                type="submit"
                                size="md"
                                variant="primary"
                                onClick={() => {
                                    sendRequest({ data: {} })
                                        .then((response) => {
                                            onClose();
                                            onReloadList();
                                            return response;
                                        })
                                        .catch((error) => {
                                            onError(error);
                                        });
                                }}
                            >
                                {t("buttons.confirm")}
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
