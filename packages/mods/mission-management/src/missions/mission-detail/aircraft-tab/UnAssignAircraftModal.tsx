import {
    Box,
    Button,
    Flex,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@volocopter/design-library-react";
import { Mission, useUnassignAircraft } from "@voloiq/network-schedule-management-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useErrorToastWithMessage } from "../../hooks/useErrorToast";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

export type UnAssignAircraftModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    onReloadList: () => void;
};

export const UnAssignAircraftModal = (props: UnAssignAircraftModalProps) => {
    const { isOpen = false, onClose, mission, onReloadList } = props;

    const { t } = useMissionTranslations();
    const { onError } = useErrorToastWithMessage();

    const { sendRequest } = useUnassignAircraft({
        missionId: mission.id,
        config: { params: { version: mission.version } },
    });

    const unAssignAircraft = () => {
        sendRequest()
            .then(() => {
                onReloadList();
                onClose();
            })
            .catch((error) => {
                onError(error);
                onClose();
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={t("missionActions.unAssignAircraft")}
                        modalTitle={t("missionActions.missionLabel", { mission: mission.flightNumber })}
                    />
                </ModalHeader>
                <ModalBody>
                    <Box bg="monochrome.200" p={3} borderRadius="sm">
                        <Text align="center">
                            {t("unAssignResource.confirmationMessage", {
                                resourceType: t("aircraft"),
                                reousrceName: `${mission.assignments?.aircraftTypeName}`,
                                missionName: mission.flightNumber,
                            })}
                        </Text>
                    </Box>

                    <Flex justifyContent="flex-end" mt={4}>
                        <Button
                            onClick={() => {
                                unAssignAircraft();
                            }}
                            type="submit"
                            leftIcon={<Icon icon="check" size={4} />}
                            size="lg"
                            variant="primary"
                        >
                            {t("buttons.done")}
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
