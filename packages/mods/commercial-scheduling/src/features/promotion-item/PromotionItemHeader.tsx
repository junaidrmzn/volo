import {
    Box,
    Button,
    HStack,
    Header,
    HeaderLayout,
    Tag,
    Text,
    VStack,
    useToast,
} from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Discount, EarlyAccess, usePublishPromotion } from "@voloiq/commercial-scheduling-api/v1";
import { DateTimeRangeDisplay } from "@voloiq/commercial-scheduling-components";
import { usePromotionStatus } from "@voloiq/commercial-scheduling-utils";
import { DiscountListItemWidget } from "../discount/list/DiscountListItemWidget";
import { EarlyAccessListItemWidget } from "../early-access/list/EarlyAccessItemWidget";
import { usePromotionItemTranslation } from "./translations/usePromotionItemTranslation";

type PromotionItemHeaderProps = {
    navigateBack: () => void;
    refetchPromotion: () => void;
    promotion: EarlyAccess | Discount;
};

export const PromotionItemHeader = (props: PromotionItemHeaderProps) => {
    const { t } = usePromotionItemTranslation();
    const { promotion, refetchPromotion, navigateBack } = props;

    const { discountType, name, regionName, status, validFrom, validTo } = promotion as Discount;
    const { sendRequest } = usePublishPromotion(promotion?.id ?? "-1");
    const toast = useToast();
    const isDraft = status === "DRAFT";
    const { variant, text } = usePromotionStatus({ status });
    const canPublish = useIsAuthorizedTo(["publish"], ["CommercialPromotion"]);
    const publishPromotion = () => {
        const title = t("publish.toast.title");
        sendRequest({})
            .then(() => {
                refetchPromotion();
                toast({
                    status: "success",
                    title,
                    description: t("publish.toast.success.description"),
                });
            })
            .catch(() =>
                toast({
                    status: "error",
                    title,
                    description: t("publish.toast.error.description"),
                })
            );
    };

    return (
        <VStack width="full">
            <HStack width="full" justifyContent="space-between">
                <HeaderLayout>
                    <HeaderLayout.Header>
                        <Header.Title
                            title={name}
                            hasReturnMarker
                            returnMarkerAriaLabel={t("generic.back")}
                            onClick={navigateBack}
                            tag={<Tag colorScheme={variant}>{text}</Tag>}
                        />
                    </HeaderLayout.Header>
                    <HeaderLayout.Content alignWithTitle>
                        <Text>{regionName}</Text>
                        <DateTimeRangeDisplay startDate={validFrom} endDate={validTo} />
                    </HeaderLayout.Content>
                </HeaderLayout>
                {canPublish && (
                    <Box alignItems="flex-start" height="full" p={6}>
                        <Button variant="primary" isDisabled={!isDraft} onClick={publishPromotion}>
                            {t("generic.publish")}
                        </Button>
                    </Box>
                )}
            </HStack>
            <VStack padding={5} width="full">
                {discountType ? (
                    <DiscountListItemWidget discount={promotion as Discount} />
                ) : (
                    <EarlyAccessListItemWidget earlyAccess={promotion as EarlyAccess} />
                )}
            </VStack>
        </VStack>
    );
};
