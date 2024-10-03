import { Button, Flex, Grid, Icon } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { FormProvider } from "@voloiq/form";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { PreviewSectionItem } from "@voloiq/text-layouts";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { MissionDepartureArrivalSkeleton } from "./MissionDepartureArrivalSkeleton";
import { UpdateScheduleFormFields } from "./UpdateScheduleFormFields";
import { useDepartureArrivalForm } from "./useDepartureArrivalForm";

type MissionDepartureArrivalProps = {
    mission: Mission;
    onReloadList: () => void;
    onClose: () => void;
    initialValues?: {
        estimatedDepartureDateTime?: Date;
        estimatedArrivalDateTime?: Date;
    };
};

export const MissionDepartureArrival = (props: MissionDepartureArrivalProps) => {
    const { mission, onReloadList, onClose, initialValues } = props;

    const { t } = useMissionTranslations();
    const { formatDateTime } = useFormatDateTime();
    const { departureArrivalFormSchema, onFormSubmit, estimatedDepartureArrivalInitialValues, isFetchingDelayCodes } =
        useDepartureArrivalForm({ mission, onReloadList, onClose, initialValues });

    return (
        <>
            {isFetchingDelayCodes ? (
                <MissionDepartureArrivalSkeleton />
            ) : (
                <>
                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        <PreviewSectionItem
                            label={t("Departure date")}
                            text={formatDateTime(mission.departureDateTime)}
                        />

                        <PreviewSectionItem label={t("Arrival date")} text={formatDateTime(mission.arrivalDateTime)} />
                    </Grid>
                    <FormProvider
                        schema={departureArrivalFormSchema}
                        formType="edit"
                        onEdit={async (data) => {
                            await onFormSubmit(data, mission.version);
                        }}
                        initialValues={estimatedDepartureArrivalInitialValues}
                    >
                        <UpdateScheduleFormFields mission={mission} onReloadList={onReloadList} onClose={onClose} />
                        <Flex justifyContent="flex-end">
                            <Button type="submit" leftIcon={<Icon icon="check" size={4} />} size="lg" variant="primary">
                                {t("buttons.done")}
                            </Button>
                        </Flex>
                    </FormProvider>
                </>
            )}
        </>
    );
};
