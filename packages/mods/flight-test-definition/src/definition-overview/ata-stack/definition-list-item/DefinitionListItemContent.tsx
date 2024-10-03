import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { useFormatDateTime } from "@voloiq/dates";
import { FlightTestDefinitionOverviewResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { BadgeWithNumber } from "@voloiq/flight-test-definition-components";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useDefinitionListItemTranslation } from "./translations/useDefinitionListItemTranslation";

export type DefinitionListItemContentProps = {
    flightTestDefinitionModified: FlightTestDefinitionOverviewResponseBody;
};

export const DefinitionListItemContent = (props: DefinitionListItemContentProps) => {
    const { flightTestDefinitionModified } = props;

    const { masterModel, msn, ata, testNumber, createTime, fileCount, ftiCount, requirementCount, summary } =
        flightTestDefinitionModified;
    const { t } = useDefinitionListItemTranslation();
    const { formatDate } = useFormatDateTime();

    return (
        <VStack spacing={3} alignItems="stretch">
            <HStack spacing={6} alignItems="flex-start">
                <TextWithLabel size="small" label={t("Master Model")} text={masterModel} />
                <TextWithLabel size="small" label={t("MSN")} text={msn} />
                <TextWithLabel size="small" label={t("ATA")} text={ata} />
                <TextWithLabel size="small" label={t("Test Number")} text={testNumber} />
                <TextWithLabel size="small" label={t("Date Created")} text={formatDate(createTime)} />
                <Spacer />
                <VStack spacing={0} alignItems="flex-start">
                    <Text fontSize="xxs" lineHeight={6} fontWeight="bold" color="fontOnBgMuted">
                        {t("Attachments")}
                    </Text>
                    <HStack spacing={1}>
                        <BadgeWithNumber title={t("Requirements")} count={requirementCount} />
                        <BadgeWithNumber title={t("FTI Parameters")} count={ftiCount} />
                        <BadgeWithNumber title={t("Attached Files")} count={fileCount} />
                    </HStack>
                </VStack>
            </HStack>
            <VStack spacing={0} alignItems="flex-start">
                <Text fontSize="xxs" lineHeight={6} fontWeight="bold" color="fontOnBgMuted">
                    {t("Summary")}
                </Text>
                <Text fontSize="xs" lineHeight={4} whiteSpace="pre-wrap">
                    <EditorTextDisplay document={summary} />
                </Text>
            </VStack>
        </VStack>
    );
};
