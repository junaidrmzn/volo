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
import { useFormatDateTime } from "@voloiq/dates";
import type { SelectOption } from "@voloiq/form";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

export type DiversionConfirmationModalProps = {
    isOpen?: boolean;
    onClose: () => void;
    mission: Mission;
    divertedVertiport?: SelectOption;
    divertedDateTime?: Date;
};

export const DiversionConfirmationModal = (props: DiversionConfirmationModalProps) => {
    const { isOpen = false, onClose, mission, divertedVertiport, divertedDateTime } = props;
    const { formatDateTime } = useFormatDateTime();
    const { t } = useMissionTranslations();

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout
                        modalType={`${t("divertMission.confirm")} -`}
                        modalTitle={t("divertMission.diversion")}
                    />
                </ModalHeader>
                <Divider />
                <ModalBody>
                    <Text pt={3} pb={6} fontSize="sm">
                        {t("divertMission.confirmationMessage", {
                            mission: mission.flightNumber,
                            arrivalVertiport: mission.arrivalVertiportCode,
                            arrivalTime: formatDateTime(mission.arrivalDateTime),
                            divertedVertiport: divertedVertiport ? divertedVertiport.label : "",
                            divertedTime: divertedDateTime ? formatDateTime(divertedDateTime) : "",
                        })}
                    </Text>
                    <Flex justifyContent="flex-end">
                        <ButtonGroup isAttached>
                            <Button variant="secondary" size="md" onClick={onClose}>
                                {t("buttons.no")}
                            </Button>
                            <Button type="submit" form="divertMissionForm" size="md" variant="primary">
                                {t("buttons.confirm")}
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
