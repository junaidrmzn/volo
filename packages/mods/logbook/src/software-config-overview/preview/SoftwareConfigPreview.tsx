import { VStack } from "@volocopter/design-library-react";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useSoftwareConfigTranslations } from "../translations/useSoftwareConfigTranslations";

export type SoftwareConfigPreviewProps = {
    softwareConfig: SoftwareConfig;
};

export const SoftwareConfigPreview = (props: SoftwareConfigPreviewProps) => {
    const { softwareConfig } = props;
    const { configType, gitHash } = softwareConfig;
    const { t } = useSoftwareConfigTranslations();

    return (
        <VStack alignItems="baseline" spacing="4">
            <TextWithLabel label={t("configTypeLabel")} text={configType} />
            <TextWithLabel label={t("gitHashLabel")} text={gitHash} />
        </VStack>
    );
};
