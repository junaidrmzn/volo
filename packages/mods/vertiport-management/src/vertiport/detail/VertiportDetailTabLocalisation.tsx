import { VStack } from "@volocopter/design-library-react";
import { AltitudeValueWithUnit } from "@volocopter/unit-inputs-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DetailItem } from "../../components";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

type VertiportDetailGeneralProps = {
    vertiport: Vertiport;
};
export const VertiportDetailTabLocalisation = (props: VertiportDetailGeneralProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();

    return (
        <VStack>
            <DetailItem
                label={t("vertiport.model.elevation")}
                value={<AltitudeValueWithUnit baseUnit="m" displayUnit="m" baseValue={vertiport.elevation} />}
            />
            <DetailItem
                label={t("vertiport.model.names")}
                value={
                    vertiport.names !== undefined && vertiport.names?.length > 0
                        ? vertiport.names?.map((name) => `${name.key} / ${name.value}`)
                        : t("generic.not available")
                }
            />
            <DetailItem
                label={t("vertiport.model.lokaliseLastUpdatedTime")}
                value={
                    vertiport.lokaliseLastUpdatedTime
                        ? formatDateTime(vertiport.lokaliseLastUpdatedTime)
                        : t("generic.not available")
                }
            />
            <DetailItem
                label={t("vertiport.model.lokaliseErrorMessage")}
                value={vertiport.lokaliseErrorMessage ?? t("generic.not available")}
            />
        </VStack>
    );
};
