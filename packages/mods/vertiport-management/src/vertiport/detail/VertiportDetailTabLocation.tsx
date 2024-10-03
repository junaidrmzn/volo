import { Text, VStack } from "@volocopter/design-library-react";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DetailItem } from "../../components";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

type VertiportDetailGeneralProps = {
    vertiport: Vertiport;
};
export const VertiportDetailTabLocation = (props: VertiportDetailGeneralProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();

    return (
        <VStack>
            <DetailItem
                label={t("vertiport.model.location")}
                value={`${vertiport.location.latitude.toFixed(3)}, ${vertiport.location.longitude.toFixed(3)}`}
            />
            <Text size="medium" fontWeight="bold" alignSelf="start">
                {t("vertiport.model.address")}
            </Text>
            <DetailItem
                label={t("vertiport.model.country")}
                value={vertiport.address?.country ?? t("generic.not available")}
            />
            <DetailItem
                label={t("vertiport.model.state")}
                value={vertiport.address?.state?.toString() ?? t("generic.not available")}
            />
            <DetailItem
                label={t("vertiport.model.city")}
                value={vertiport.address?.city ?? t("generic.not available")}
            />
            <DetailItem
                label={t("vertiport.model.zipCode")}
                value={vertiport.address?.zipCode ?? t("generic.not available")}
            />
            <DetailItem
                label={t("vertiport.model.addressLine1")}
                value={vertiport.address?.addressLine1 ?? t("generic.not available")}
            />
            <DetailItem
                label={t("vertiport.model.addressLine2")}
                value={vertiport.address?.addressLine2 ?? t("generic.not available")}
            />
        </VStack>
    );
};
