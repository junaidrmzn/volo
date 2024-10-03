import { GridItem, Stack, Text, VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import type { Region } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

export type RegionPreviewContentProps = {
    region: Region;
};

export const RegionPreview = (props: RegionPreviewContentProps) => {
    const { region } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();
    const validFrom = formatDateTime(region.validFrom);
    const validTo = region.validTo ? formatDateTime(region.validTo) : t("generic.not available");
    const publicFrom = region.publicFrom ? formatDateTime(region.publicFrom) : t("generic.not available");
    const publicTo = region.publicTo ? formatDateTime(region.publicTo) : t("generic.not available");

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("vertiport.overview.general")}>
                <PreviewSectionItem label={t("region.model.validFrom")} text={validFrom} />
                <PreviewSectionItem label={t("region.model.validTo")} text={validTo} />
                <PreviewSectionItem label={t("region.model.publicFrom")} text={publicFrom} />
                <PreviewSectionItem label={t("region.model.publicTo")} text={publicTo} />
                <PreviewSectionItem label={t("region.model.createdBy")} text={region.createdBy} />
                <PreviewSectionItem label={t("region.model.createTime")} text={formatDateTime(region.createTime)} />
                <PreviewSectionItem label={t("region.model.updatedBy")} text={region.updatedBy} />
                <PreviewSectionItem label={t("region.model.updateTime")} text={formatDateTime(region.updateTime)} />
            </PreviewSection>
            <PreviewSection headerLabel={t("vertiport.overview.location")}>
                <GridItem gridColumn="unset">
                    <Stack spacing="0">
                        <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                            {t("region.model.coordinates")}
                        </Text>
                        {region.coordinates.points.map((point) => (
                            <Text
                                size="medium"
                                overflowWrap="anywhere"
                                key={(point.height + point.latitude).toString()}
                            >
                                {`${point.latitude.toFixed(3)} / ${point.longitude.toFixed(3)}`}
                            </Text>
                        ))}
                    </Stack>
                </GridItem>
                <PreviewSectionItem
                    label={t("region.model.center")}
                    text={`${region.center.latitude.toFixed(3)} / ${region.center.longitude.toFixed(3)}`}
                />
                <PreviewSectionItem
                    label={t("vertiport.model.elevation")}
                    text={region.center.height.toString()}
                    fullWidth
                />
            </PreviewSection>
        </VStack>
    );
};
