import { Box, Grid } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import type { SoftwareConfig } from "@voloiq/logbook-api/v6";
import { TextWithLabel } from "@voloiq/text-layouts";
import { formatUTCDate } from "@voloiq/utils";
import { useSoftwareConfigTranslations } from "../translations/useSoftwareConfigTranslations";

export type SoftwareConfigListItemProps = {
    softwareConfig: SoftwareConfig;
} & CardListItemProps;

export const SoftwareConfigListItem = (props: SoftwareConfigListItemProps) => {
    const { softwareConfig, ...cardListItemProps } = props;
    const { createTime, configType, gitHash } = softwareConfig;
    const creationDate = formatUTCDate(new Date(createTime));
    const { t } = useSoftwareConfigTranslations();

    return (
        <CardListItem {...cardListItemProps}>
            <CardListItem.Identifier>
                <Box fontWeight="bold" fontSize="lg" lineHeight="short" title={creationDate}>
                    {creationDate}
                </Box>
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <Grid boxSize="full" templateColumns="repeat(2, 1fr)" columnGap={6}>
                    <TextWithLabel label={t("configTypeLabel")} text={configType} />
                    <TextWithLabel label={t("gitHashLabel")} text={gitHash} />
                </Grid>
            </CardListItem.AdditionalContent>
        </CardListItem>
    );
};
