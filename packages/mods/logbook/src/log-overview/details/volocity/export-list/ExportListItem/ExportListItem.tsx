import {
    Box,
    Grid,
    GridItem,
    HStack,
    Icon,
    IconButton,
    Pictogram,
    Stack,
    Text,
} from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { CardListItem } from "@voloiq/card-list-item";
import type { DataState, Export } from "@voloiq/logbook-api/v6";
import { TextWithLabel } from "@voloiq/text-layouts";
import { formatUTCDate } from "@voloiq/utils/src";
import { LogEntryStatusTag } from "../../../../../libs/logbook/LogEntryStatusTag";
import { StatusInfo } from "../../../file-list/FileStatusInfo/StatusInfo";
import { useLogDetailsTranslation } from "../../../translations/useLogDetailsTranslation";
import { ParameterPopover } from "./ParameterPopover/ParameterPopover";

export type ExportListItemProps = {
    exportElement: Export;
    handleDownloadEvent: () => void;
    dataState: DataState;
};
export const ExportListItem = (props: ExportListItemProps) => {
    const { exportElement, handleDownloadEvent, dataState } = props;
    const { t } = useLogDetailsTranslation();

    const badgeLabel = match(dataState)
        .with("TM_DATA", () => t("general.generalView.telemetryData"))
        .with("ONBOARD_RECORDED_DATA", () => t("general.generalView.onBoardData"))
        .with("NO_DATA", () => "")
        .otherwise(() => "");

    return (
        <CardListItem variant="subtle">
            <CardListItem.Identifier>
                <HStack spacing={7}>
                    <Box position="relative">
                        <Pictogram pictogram="document" size={16} verticalAlign="middle" />
                        <Box
                            position="absolute"
                            top="28px"
                            left="50%"
                            transform="translateX(-50%)"
                            fontSize="12px"
                            fontWeight="bold"
                            aria-hidden="true"
                        >
                            {t(`exports.exportList.fileTypes.${exportElement.fileType}`)}
                        </Box>
                    </Box>
                    <Stack spacing={2}>
                        <Text fontWeight="bold" overflowWrap="anywhere">
                            {exportElement.description}
                        </Text>
                        <StatusInfo status={exportElement.status} showProcessed>
                            <StatusInfo.StatusErrorContent>{() => <Text>Error</Text>}</StatusInfo.StatusErrorContent>
                        </StatusInfo>
                    </Stack>
                </HStack>
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <Grid templateColumns="repeat(3, 1fr)" columnGap={6} width="full">
                    <GridItem colSpan={1}>
                        <TextWithLabel
                            label={t("exports.exportList.startTime")}
                            text={formatUTCDate(new Date(exportElement.exportArguments.startTime))}
                        />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <TextWithLabel
                            label={t("exports.exportList.endTime")}
                            text={formatUTCDate(new Date(exportElement.exportArguments.endTime))}
                        />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <TextWithLabel
                            label={t("exports.exportList.sampleRate")}
                            text={exportElement.exportArguments.sampleRate}
                        />
                    </GridItem>
                </Grid>
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <HStack justifyContent="end" align="center" h="full">
                    {dataState && dataState !== "NO_DATA" && (
                        <LogEntryStatusTag label={badgeLabel} status={dataState} />
                    )}
                    <ParameterPopover exportArguments={exportElement.exportArguments} />
                    <IconButton
                        m={0}
                        aria-label={t("exports.exportList.downloadButtonAriaLabel")}
                        onClick={() => handleDownloadEvent()}
                        variant="ghost"
                        icon={<Icon icon="download" size={4} />}
                        visibility={exportElement.status === "PROCESSED" ? "visible" : "hidden"}
                    />
                </HStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
