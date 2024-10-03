import { Flex } from "@volocopter/design-library-react";
import type { Parameter } from "@voloiq-typescript-api/fti-types";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useExportModalTranslation } from "./translations/useExportModalTranslation";

export type TagSelectListItemProps = {
    parameter: Parameter;
};

export const TagSelectListItem = (props: TagSelectListItemProps) => {
    const { parameter } = props;
    const { shortDescription, ftiCode, minimumSamplingFrequency, unit } = parameter;

    const { t } = useExportModalTranslation();

    return (
        <Flex justifyContent="space-between" gap={12}>
            <IdentifierStack mainIdentifier={ftiCode || ""} secondaryIdentifier={shortDescription} />
            <TextWithLabel label={t("listItem.unit")} text={unit?.label} />
            <TextWithLabel label={t("listItem.minimumSamplingFrequency")} text={minimumSamplingFrequency} />
        </Flex>
    );
};
