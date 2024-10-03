import { VStack } from "@volocopter/design-library-react";
import React from "react";
import { useFormatDateTime } from "@voloiq/dates";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DetailItem } from "../../components";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

type VertiportDetailGeneralProps = {
    vertiport: Vertiport;
};

export const VertiportDetailTabGeneral = (props: VertiportDetailGeneralProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();
    const publicFrom = vertiport.publicFrom ? formatDateTime(vertiport.publicFrom) : "-";
    const publicTo = vertiport.publicTo ? formatDateTime(vertiport.publicTo) : "-";
    const servicesList =
        vertiport.services !== undefined && vertiport.services?.length > 0
            ? vertiport.services
                  ?.filter((service) => service.available ?? false)
                  .map((service) => `${service.serviceKey}`)
            : undefined;

    return (
        <VStack>
            <DetailItem label={t("vertiport.model.name")} value={vertiport.name} />
            <DetailItem label={t("vertiport.model.shortName")} value={vertiport.shortName} />
            <DetailItem label={t("vertiport.model.regionName")} value={vertiport.region?.name} />
            <DetailItem label={t("vertiport.model.countryCode")} value={vertiport.countryCode} />

            <DetailItem
                label={t("vertiport.model.iataCode")}
                value={vertiport.iataCode ?? t("generic.not available")}
            />
            <DetailItem
                label={t("vertiport.model.icaoCode")}
                value={vertiport.icaoCode ?? t("generic.not available")}
            />
            <DetailItem label={t("vertiport.model.publicFrom")} value={publicFrom} />
            <DetailItem label={t("vertiport.model.publicTo")} value={publicTo} />
            <DetailItem label={t("vertiport.model.timeZone")} value={vertiport.timeZone} />
            <DetailItem label={t("vertiport.model.shortName")} value={vertiport.popularity} />
            <DetailItem label={t("vertiport.model.popularity")} value={vertiport.popularity?.toString()} />
            <DetailItem
                label={t("vertiport.model.services")}
                value={servicesList === undefined ? t("generic.not available") : servicesList}
            />
            {vertiport.passengerCheckinType && (
                <DetailItem
                    label={t("vertiport.model.passengerCheckinType")}
                    value={t(`vertiport.passengerCheckinType.${vertiport.passengerCheckinType}`)}
                />
            )}
            <DetailItem label={t("vertiport.model.createdBy")} value={vertiport.createdBy} />
            <DetailItem label={t("vertiport.model.createTime")} value={formatDateTime(vertiport.createTime)} />
            <DetailItem label={t("vertiport.model.updatedBy")} value={vertiport.updatedBy} />
            <DetailItem label={t("vertiport.model.updateTime")} value={formatDateTime(vertiport.updateTime)} />
        </VStack>
    );
};
