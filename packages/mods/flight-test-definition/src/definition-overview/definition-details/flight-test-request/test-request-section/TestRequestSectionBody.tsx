import { HStack, Spacer, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { P, match } from "ts-pattern";
import { useFormatDateTime } from "@voloiq/dates";
import type { FlightTestDefinitionResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useTestRequestSectionTranslation } from "./translations/useTestRequestSectionTranslation";

export type FlightTestRequestSectionBodyProps = {
    definition: FlightTestDefinitionResponseBody;
};

export const FlightTestRequestSectionBody = (props: FlightTestRequestSectionBodyProps) => {
    const { definition } = props;
    const { t } = useTestRequestSectionTranslation();
    const { formatDateTime } = useFormatDateTime();
    const {
        ftdId,
        title,
        masterModel,
        msn,
        ata,
        testNumber,
        revision,
        createTime,
        summary,
        scope,
        testArticle,
        testType,
        requesterName,
        model,
    } = definition;

    return (
        <VStack spacing={4} alignItems="stretch" width="full">
            <VStack spacing={6}>
                <HStack spacing={6} width="full">
                    <TextWithLabel size="small" label={t("Title")} text={title} />
                    <TextWithLabel size="small" label={t("FTD ID")} text={ftdId} />
                    <Spacer />
                    <TextWithLabel size="small" label={t("ATA")} text={ata.toString()} textAlign="right" />
                    <TextWithLabel size="small" label={t("Revision")} text={revision} textAlign="right" />
                </HStack>
                <HStack spacing={6} width="full">
                    <TextWithLabel size="small" label={t("Master Model")} text={masterModel} />
                    <TextWithLabel size="small" label={t("Model")} text={model} />
                    <TextWithLabel size="small" label={t("MSN")} text={msn} />
                    <TextWithLabel size="small" label={t("Test Number")} text={testNumber} />
                    <TextWithLabel
                        size="small"
                        label={t("Test Type")}
                        text={match(testType)
                            .with("FLIGHT", () => t("Flight"))
                            .with("GROUND", () => t("Ground"))
                            .with(P.nullish, () => undefined)
                            .exhaustive()}
                    />
                    <Spacer />
                    <TextWithLabel
                        size="small"
                        label={t("Date Created")}
                        text={formatDateTime(createTime)}
                        textAlign="right"
                    />
                    <TextWithLabel size="small" label={t("Created By")} text={requesterName} textAlign="right" />
                </HStack>
            </VStack>
            <TextWithLabel size="small" label={t("Summary")} text={<EditorTextDisplay document={summary} />} />
            <TextWithLabel size="small" label={t("Scope")} text={<EditorTextDisplay document={scope} />} />
            <TextWithLabel
                size="small"
                label={
                    <>
                        {t("Test Article.Name")}{" "}
                        <Text fontWeight="normal" as="span" fontSize="inherit">
                            ({t("Test Article.Subtitle")})
                        </Text>
                    </>
                }
                text={<EditorTextDisplay document={testArticle} />}
            />
        </VStack>
    );
};
