import { Box, Grid, GridItem, Tag, Text } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { TextWithLabel } from "@voloiq/text-layouts";
import type { Pad } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";

type PadCardProps = {
    pad: Pad;
};

export const PadCard = (props: PadCardProps) => {
    const { pad } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();
    return (
        <Grid templateColumns="repeat(10, 1fr)" rowGap={3}>
            <GridItem colSpan={5}>
                <TextWithLabel label={t("fatoStand.model.externalId")} text={pad.externalId} />
            </GridItem>
            <GridItem colSpan={5}>
                <TextWithLabel label={t("fatoStand.model.longitude")} text={pad.location.longitude.toString()} />
            </GridItem>
            <GridItem colSpan={5}>
                <TextWithLabel label={t("fatoStand.model.latitude")} text={pad.location.latitude.toString()} />
            </GridItem>
            <GridItem colSpan={5}>
                <TextWithLabel label={t("fatoStand.model.height")} text={pad.location.height.toString()} />
            </GridItem>
            <GridItem colSpan={5}>
                <TextWithLabel label={t("fatoStand.model.validFrom")} text={formatDateTime(pad.validFrom)} />
            </GridItem>
            <GridItem colSpan={5}>
                <TextWithLabel
                    label={t("fatoStand.model.validTo")}
                    text={pad.validTo ? formatDateTime(pad.validTo) : ""}
                />
            </GridItem>
            <GridItem colSpan={5}>
                <Box>
                    <Text lineHeight={6} fontWeight="bold" fontSize="xs" color="fontOnBgMuted">
                        {t("fatoStand.model.services")}
                    </Text>
                    {pad.services &&
                        pad.services.map((service) => (
                            <Tag m={1} colorScheme="gray" key={service}>
                                {service}
                            </Tag>
                        ))}
                </Box>
            </GridItem>
        </Grid>
    );
};
