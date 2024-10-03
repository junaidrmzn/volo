import { Box, Button, Flex, HStack, Icon } from "@volocopter/design-library-react";
import type { Aircraft, ParameterStatusEnum } from "@voloiq-typescript-api/fti-types";
import { TextWithLabel } from "@voloiq/text-layouts";
import { AircraftStatusSelectForm } from "./parameter-status-form/AircraftStatusSelectForm";
import { useParameterStatusTranslation } from "./translations/useParameterStatusTranslation";

export type AircraftStatusSelectProps = {
    onSubmit: (payload: { status: ParameterStatusEnum; validFrom: string }) => void;
    initialStatus: ParameterStatusEnum;
    aircraft: Aircraft;
};

export const AircraftStatusSelect = (props: AircraftStatusSelectProps) => {
    const { initialStatus, onSubmit, aircraft } = props;
    const { t } = useParameterStatusTranslation();
    const formId = "parameter-status-select";

    return (
        <>
            <TextWithLabel
                label={t("parameterStatusSelect.aircraftLabel")}
                text={`${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`}
            />
            <HStack mt={2} spacing="4" alignItems="end" w="full">
                <Box w="full">
                    <AircraftStatusSelectForm initialStatus={initialStatus} formId={formId} onSubmit={onSubmit} />
                </Box>
            </HStack>
            <Flex justifyContent="flex-end" w="full" mt="4">
                <Button
                    form={formId}
                    type="submit"
                    size="lg"
                    aria-label={t("parameterStatusSelect.doneButton")}
                    leftIcon={<Icon icon="check" />}
                    variant="primary"
                >
                    {t("parameterStatusSelect.doneButton")}
                </Button>
            </Flex>
        </>
    );
};
