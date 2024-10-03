import { VStack } from "@volocopter/design-library-react";
import { Connection, Vertiport, useGetVertiports } from "@voloiq/commercial-scheduling-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useEntityFormatter } from "@voloiq/utils";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";

type ConnectionPreviewProps = {
    connection: Connection;
};

const findVertiport = (vertiports: Vertiport[], code: string | undefined) => {
    return vertiports.find((vertiport) => vertiport.code === code);
};

export const ConnectionPreview = (props: ConnectionPreviewProps) => {
    const { connection } = props;
    const { t } = useConnectionTranslation();
    const { formatDateTime } = useFormatDateTime();
    const { data: vertiports } = useGetVertiports();
    const { formatWithParentheses } = useEntityFormatter();

    if (!connection) {
        return null;
    }

    const departureVertiport = findVertiport(vertiports || [], connection.departureVertiportCode);
    const arrivalVertiport = findVertiport(vertiports || [], connection.arrivalVertiportCode);

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("details.general")}>
                <PreviewSectionItem label={t("model.name")} text={connection.name} fullWidth />
                <PreviewSectionItem label={t("model.title")} text={connection.title} />
                <PreviewSectionItem
                    label={t("model.subtitle")}
                    text={connection.subtitle ?? t("generic.not available")}
                />
            </PreviewSection>
            <PreviewSection headerLabel={t("details.flight")}>
                <PreviewSectionItem
                    label={t("model.aircraftType")}
                    text={connection.aircraftTypeName ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("model.passengerSeats")}
                    text={connection.passengerSeats.toString() ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("model.category")}
                    text={connection.category ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("model.region")}
                    text={connection.regionName ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    fullWidth
                    label={t("model.flightDuration")}
                    text={`${connection.flightDuration} ${t("model.minutes")}`}
                />
                <PreviewSectionItem
                    label={t("model.departureVertiportId")}
                    text={formatWithParentheses(
                        departureVertiport?.shortName,
                        departureVertiport?.code,
                        t("generic.not available")
                    )}
                />
                <PreviewSectionItem
                    label={t("model.arrivalVertiportId")}
                    text={formatWithParentheses(
                        arrivalVertiport?.shortName,
                        arrivalVertiport?.code,
                        t("generic.not available")
                    )}
                />
            </PreviewSection>
            <PreviewSection headerLabel={t("details.valid")}>
                <PreviewSectionItem
                    label={t("model.validFrom")}
                    text={formatDateTime(new Date(connection.validFrom))}
                />
                <PreviewSectionItem
                    label={t("model.validTo")}
                    text={
                        connection.validTo ? formatDateTime(new Date(connection.validTo)) : t("generic.not available")
                    }
                />
            </PreviewSection>
        </VStack>
    );
};
