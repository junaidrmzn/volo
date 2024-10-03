import { Flex, HStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useGeneralInformationSectionTranslation } from "./translations/useGeneralInformationSectionTranslation";

export type GeneralInformationContentProps = {
    temporaryLimitationsAircraftConfiguration?: string;
    referenceSubstantiation?: string;
};

export const GeneralInformationContent = (props: GeneralInformationContentProps) => {
    const { referenceSubstantiation, temporaryLimitationsAircraftConfiguration } = props;

    const { t } = useGeneralInformationSectionTranslation();

    return (
        <HStack w="full" spacing={4} alignItems="stretch">
            <Flex flex={1}>
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("Temporary Limitations due to Aircraft Configuration")}
                    text={<EditorTextDisplay document={temporaryLimitationsAircraftConfiguration} />}
                />
            </Flex>
            <Flex flex={1}>
                <TextWithLabel
                    unknownValueText="-"
                    size="small"
                    label={t("Reference / Substantiation")}
                    text={<EditorTextDisplay document={referenceSubstantiation} />}
                />
            </Flex>
        </HStack>
    );
};
