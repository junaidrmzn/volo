import { Box } from "@volocopter/design-library-react";
import { PlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { TextWithLabel } from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryCustomItemColorScheme } from "@voloiq/commercial-scheduling-utils";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";

type PlanSummaryPriceItemProps = Pick<
    PlanSummary,
    "isCustomized" | "offers" | "customItemStatus" | "customOfferRunwayValue" | "customOfferRunwayUnit"
>;

export const PlanSummaryOfferItem = (props: PlanSummaryPriceItemProps) => {
    const { isCustomized, offers, customItemStatus, customOfferRunwayValue, customOfferRunwayUnit } = props;
    const hasCustomRunwayValue = isCustomized && customOfferRunwayValue;
    const hasCustomRunwayUnit = isCustomized && customOfferRunwayUnit;
    const offerRunwayValue = hasCustomRunwayValue ? customOfferRunwayValue : offers?.[0]?.offerRunwayValue;
    const offerRunwayUnit = hasCustomRunwayUnit ? customOfferRunwayUnit : offers?.[0]?.offerRunwayUnit;
    const backgroundColor = usePlanSummaryCustomItemColorScheme(customItemStatus);
    const { t } = usePlanSummaryTranslation();

    return (
        <Box backgroundColor={hasCustomRunwayValue ? backgroundColor : undefined} borderRadius="xs" px={3} py={1}>
            <TextWithLabel
                label={t("overview.Offer Runway")}
                text={offerRunwayValue}
                suffix={offerRunwayUnit ? t(`units.${offerRunwayUnit}`) : ""}
                noTextLabel={t("overview.noOffer")}
            />
        </Box>
    );
};
