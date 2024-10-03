import { Box, Button, HStack, Icon } from "@volocopter/design-library-react";
import type { ParameterStatusEnum } from "@voloiq-typescript-api/fti-types";
import { ParameterStatusSelectForm } from "./parameter-status-form/ParameterStatusSelectForm";
import { useParameterStatusTranslation } from "./translations/useParameterStatusTranslation";

export type ParameterStatusSelectProps = {
    onSubmit: (payload: { status: ParameterStatusEnum; validFrom: string }) => void;
    initialStatus: ParameterStatusEnum;
};

export const ParameterStatusSelect = (props: ParameterStatusSelectProps) => {
    const { initialStatus, onSubmit } = props;
    const { t } = useParameterStatusTranslation();

    const formId = "parameter-status-select";

    return (
        <HStack spacing="4" alignItems="end" w="full">
            <Box w="full">
                <ParameterStatusSelectForm initialStatus={initialStatus} formId={formId} onSubmit={onSubmit} />
            </Box>
            <Button
                form={formId}
                type="submit"
                aria-label={t("parameterStatusSelect.saveButton")}
                variant="secondary"
                size="md"
            >
                <Icon size={5} icon="check" />
            </Button>
        </HStack>
    );
};
