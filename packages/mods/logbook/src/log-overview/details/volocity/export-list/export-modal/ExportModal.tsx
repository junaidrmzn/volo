import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@volocopter/design-library-react";
import { TagSelect } from "@volocopter/tag-select-react";
import type { Parameter } from "@voloiq-typescript-api/fti-types";
import type { Log } from "@voloiq/logbook-api/v6";
import { TagSelectListItem } from "./TagSelectListItem";
import { ExportForm } from "./export-form/ExportForm";
import { useFtiCodesValidation } from "./parameter-input/useFtiCodesValidation";
import { useExportModalTranslation } from "./translations/useExportModalTranslation";
import { useExportModal } from "./useExportModal";
import { useSearchParameters } from "./useSearchParameters";

export type ExportModalProps = {
    isOpen: boolean;
    selectedLog?: Log;
    onClose: () => void;
    onExportCreated: () => void;
};

export const ExportModal = (props: ExportModalProps) => {
    const { isOpen, onClose, selectedLog, onExportCreated } = props;
    const { t, i18n } = useExportModalTranslation();
    const formId = "exportForm";

    const { ftiCodesWithStatus, setFtiCodesWithStatus, resetAllFtiCodesWithStatus } = useFtiCodesValidation({
        startDate: selectedLog?.date!,
    });

    const {
        handleSubmit,
        initFocusRef,
        separateString,
        showDataPointLimitError,
        setShowDataPointLimitError,
        dataPointCount,
    } = useExportModal(selectedLog!, ftiCodesWithStatus, onClose, onExportCreated);

    const { searchParameters, pagination } = useSearchParameters();

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                resetAllFtiCodesWithStatus();
                setShowDataPointLimitError(false);
                onClose();
            }}
            size="6xl"
            initialFocusRef={initFocusRef}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Text fontWeight="bold" size="md">
                        {t("header", { fto: selectedLog?.flightTestOrder })}
                    </Text>
                </ModalHeader>
                <ModalBody mt={6}>
                    <ExportForm formId={formId} handleSubmit={handleSubmit} selectedLog={selectedLog!} />
                    <Box mt={5}>
                        <TagSelect<Parameter>
                            searchDebounceTime={700}
                            label={`${t("tagSelect.label")}:*`}
                            inputPlaceholder={t("tagSelect.placeholder")}
                            onChange={setFtiCodesWithStatus}
                            values={ftiCodesWithStatus}
                            separateInput={separateString}
                            loadEntity={(filterBy) => searchParameters(filterBy, selectedLog!.date)}
                            resourceToString={(resource) => resource.ftiCode || ""}
                            getAriaLabel={() => t("tagSelect.ariaLabel")}
                            noResultsText={t("tagSelect.noResultsText")}
                            getResultCountText={() =>
                                `${(pagination?.totalElements ?? 0) > 100 ? t("tagSelect.limitedResult") : ""} ${t(
                                    "tagSelect.resultCountText",
                                    {
                                        count: pagination?.totalElements,
                                    }
                                )}`
                            }
                            loadEntityErrorText={t("tagSelect.loadEntityErrorText")}
                            initialValidationStatus="unknown"
                            closeTagAriaLabel={t("close")}
                        >
                            <TagSelect.ListItem>
                                {(parameter: Parameter) => <TagSelectListItem parameter={parameter} />}
                            </TagSelect.ListItem>
                        </TagSelect>
                    </Box>
                    {showDataPointLimitError && (
                        <Box mt={5}>
                            <Text variant="error">
                                {t("dataPointLimitError", {
                                    dataPointCount: dataPointCount.toLocaleString(i18n.language),
                                })}
                            </Text>
                        </Box>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Flex justifyContent="end">
                        <ButtonGroup isAttached>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    resetAllFtiCodesWithStatus();
                                    setShowDataPointLimitError(false);
                                    onClose();
                                }}
                                ref={initFocusRef}
                            >
                                {t("cancelButton")}
                            </Button>
                            <Button type="submit" form={formId}>
                                {t("confirmButton")}
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
