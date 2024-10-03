import { Box, Button, Flex, Spacer, Stack } from "@volocopter/design-library-react";
import type { ParameterStatusSelectProps } from "./ParameterStatusSelect";
import { ParameterStatusSelectForm } from "./parameter-status-form/ParameterStatusSelectForm";
import { useParameterStatusTranslation } from "./translations/useParameterStatusTranslation";

type BulkParameterStatusSelectProps = {
    onCancel: () => void;
    isSubmitButtonActive: boolean;
} & ParameterStatusSelectProps;

export const BulkParameterStatusSelect: FCC<BulkParameterStatusSelectProps> = (props) => {
    const { onSubmit, initialStatus, onCancel, isSubmitButtonActive, children } = props;
    const { t } = useParameterStatusTranslation();
    const formId = "bulk-parameter-status-select";

    return (
        <Box h="full">
            <Flex direction="column" alignItems="stretch" h="full" gap={8}>
                <Box>
                    <ParameterStatusSelectForm initialStatus={initialStatus} formId={formId} onSubmit={onSubmit} />
                </Box>
                {children}
                <Spacer />
                <Stack>
                    <Button
                        type="submit"
                        form={formId}
                        aria-label={t("bulkParametersStatusSelect.updateButton")}
                        variant="secondary"
                        size="md"
                        isDisabled={!isSubmitButtonActive}
                    >
                        {t("bulkParametersStatusSelect.updateButton")}
                    </Button>
                    <Button onClick={() => onCancel()} variant="primary">
                        {t("bulkParametersStatusSelect.cancelButton")}
                    </Button>
                </Stack>
            </Flex>
        </Box>
    );
};
