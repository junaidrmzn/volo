import { Box, Button, CardList, Center, Icon, Select, Skeleton, Text } from "@volocopter/design-library-react";
import { RequirePermissions } from "@voloiq/auth";
import { DataState } from "@voloiq/logbook-api/v6";
import { SectionHeader } from "@voloiq/text-layouts";
import { useLogDetailsTranslation } from "../../translations/useLogDetailsTranslation";
import { ExportListItem } from "./ExportListItem/ExportListItem";
import { useExportList } from "./useExportList";

export type ExportListProps = {
    setExportRequestLog: () => void;
    logId: string;
    dataState: DataState;
    exportsDisabled?: boolean;
};

export const ExportList = (props: ExportListProps) => {
    const { setExportRequestLog, logId, dataState, exportsDisabled = false } = props;

    const { t } = useLogDetailsTranslation();

    const {
        handleDownloadEvent,
        showAllExports,
        exportData: exportList,
        getExportState,
        setShowAllExports,
        selectOptions,
    } = useExportList(logId);

    const isLoading = getExportState === "pending";

    return (
        <>
            <SectionHeader label={t("exports.header")}>
                <RequirePermissions resources={["LogExport"]} actions={["create"]}>
                    <Button
                        variant="ghost"
                        leftIcon={<Icon icon="plus" />}
                        marginBottom={-1.5}
                        onClick={() => setExportRequestLog()}
                        isDisabled={exportsDisabled}
                    >
                        {t("exports.requestExportButton")}
                    </Button>
                </RequirePermissions>
            </SectionHeader>

            <Box alignSelf="end" width={80}>
                <Select
                    size="sm"
                    value={showAllExports ? selectOptions[0] : selectOptions[1]}
                    options={selectOptions}
                    onChange={(value) => setShowAllExports(!!value && value.value === "all")}
                />
            </Box>
            {isLoading ? (
                <Skeleton mb={2} height="100px" isLoading />
            ) : exportList.length > 0 ? (
                <CardList data-testid="export-list">
                    {exportList.map((exportElement) => (
                        <ExportListItem
                            key={exportElement.id}
                            exportElement={exportElement}
                            dataState={dataState}
                            handleDownloadEvent={() => handleDownloadEvent(logId, exportElement.id)}
                        />
                    ))}
                </CardList>
            ) : (
                <Center>
                    <Text mb={16}>{t("exports.exportList.emptyList")}</Text>
                </Center>
            )}
        </>
    );
};
