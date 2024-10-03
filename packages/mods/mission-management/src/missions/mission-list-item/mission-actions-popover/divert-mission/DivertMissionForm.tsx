import { Button, ButtonGroup, Flex, Grid, useDisclosure } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { createFormControl, useForm } from "@voloiq/form";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { PreviewSectionItem } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { DiversionConfirmationModal } from "./DiversionConfirmationModal";
import type { DivertMissionSchema } from "./useDivertMissionForm";

type DivertMissionFormProps = {
    mission: Mission;
    onClose: () => void;
};

export const DivertMissionForm = (props: DivertMissionFormProps) => {
    const { mission, onClose } = props;
    const { t } = useMissionTranslations();
    const { formatDateTime } = useFormatDateTime();
    const FormControl = createFormControl<DivertMissionSchema>();
    const { getValues } = useForm();

    const {
        isOpen: isConfirmDivertionModalOpen,
        onClose: onCloseConfirmDiversionModal,
        onOpen: onOpenConfirmDivertionModal,
    } = useDisclosure();

    return (
        <>
            <Grid templateColumns="repeat(1, 1fr)" gap={2.5} pt={3}>
                <PreviewSectionItem label={t("scheduledDepartureVertiport")} text={mission.departureVertiportCode} />
                <PreviewSectionItem label={t("scheduledArrivalVertiport")} text={mission.arrivalVertiportCode} />
                <FormControl fieldName="arrivalVertiport" />
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={2.5}>
                <PreviewSectionItem label={t("Departure date")} text={formatDateTime(mission.departureDateTime)} />
                <PreviewSectionItem label={t("Arrival date")} text={formatDateTime(mission.arrivalDateTime)} />
            </Grid>
            <FormControl fieldName="estimatedArrivalDateTime" />
            <Flex justifyContent="flex-end" pt={10}>
                <ButtonGroup isAttached>
                    <Button variant="secondary" size="md" onClick={onClose}>
                        {t("buttons.cancel")}
                    </Button>
                    <Button size="md" variant="primary" onClick={onOpenConfirmDivertionModal}>
                        {t("buttons.save")}
                    </Button>
                </ButtonGroup>
            </Flex>
            <DiversionConfirmationModal
                isOpen={isConfirmDivertionModalOpen}
                onClose={onCloseConfirmDiversionModal}
                mission={mission}
                divertedVertiport={getValues("arrivalVertiport")}
                divertedDateTime={getValues("estimatedArrivalDateTime")}
            />
        </>
    );
};
