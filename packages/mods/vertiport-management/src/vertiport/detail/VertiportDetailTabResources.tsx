import { VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DetailItem } from "../../components";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

type VertiportDetailGeneralProps = {
    vertiport: Vertiport;
};
export const VertiportDetailTabResources = (props: VertiportDetailGeneralProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();

    return (
        <VStack>
            <DetailItem
                label={t("vertiport.model.images")}
                value={
                    vertiport.images !== undefined && vertiport.images?.length > 0
                        ? vertiport.images?.map((image) => `${image.key} / ${image.value}`)
                        : t("generic.not available")
                }
            />
            {vertiport.synchronizedWithLeon && (
                <>
                    <DetailItem label={t("vertiport.source")} value={t("vertiport.leon")} />
                    <DetailItem
                        label={t("vertiport.lastSynchronizedAt")}
                        value={vertiport.lastSynchronizedAt ? formatDateTime(vertiport.lastSynchronizedAt) : "-"}
                    />
                </>
            )}
            {vertiport.sitaId && <DetailItem label={t("vertiport.sitaId")} value={vertiport.sitaId} />}
        </VStack>
    );
};
