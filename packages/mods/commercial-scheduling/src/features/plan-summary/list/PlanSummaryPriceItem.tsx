import { Box } from "@volocopter/design-library-react";
import { PlanSummary } from "@voloiq/commercial-scheduling-api/v1";
import { TextWithLabel } from "@voloiq/commercial-scheduling-components";
import { usePlanSummaryCustomItemColorScheme } from "@voloiq/commercial-scheduling-utils";
import { usePlanSummaryTranslation } from "../translations/usePlanSummaryTranslation";

type PlanSummaryPriceItemProps = Pick<PlanSummary, "isCustomized" | "prices" | "customItemStatus" | "customPrice">;

export const PlanSummaryPriceItem = (props: PlanSummaryPriceItemProps) => {
    const { isCustomized, prices, customItemStatus, customPrice } = props;
    const hasCustomPrice = isCustomized && customPrice;
    const price = hasCustomPrice ? customPrice : prices?.[0]?.price;
    const currency = prices?.[0]?.currency;
    const backgroundColor = usePlanSummaryCustomItemColorScheme(customItemStatus);
    const { t } = usePlanSummaryTranslation();

    return (
        <Box backgroundColor={hasCustomPrice ? backgroundColor : undefined} borderRadius="xs" px={3} py={1}>
            <TextWithLabel label={t("overview.Price")} text={price} suffix={currency} noTextLabel="-" />
        </Box>
    );
};
