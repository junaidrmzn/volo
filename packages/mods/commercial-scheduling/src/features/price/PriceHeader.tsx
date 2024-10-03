import { Button, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Price, useUpdatePriceStatus } from "@voloiq/commercial-scheduling-api/v1";
import { PriceStatusTag } from "@voloiq/commercial-scheduling-components";
import { ApprovePrice } from "./actions/approve/ApprovePrice";
import { RejectPrice } from "./actions/reject/RejectPrice";
import { usePriceTranslation } from "./translations/usePriceTranslation";

type PriceHeaderProps = {
    price: Price;
    refetchPrice: () => void;
    refetchPlan: () => void;
};

export const PriceHeader = (props: PriceHeaderProps) => {
    const { price, refetchPrice, refetchPlan } = props;
    const { id, status, commercialPriceItems } = price;
    const resource = "CommercialPricing";

    const { t } = usePriceTranslation();
    const toast = useToast();
    const { sendRequest } = useUpdatePriceStatus(id);
    const authorizedToRequest = useIsAuthorizedTo(["request-approval"], [resource]);
    const canApprove = useIsAuthorizedTo(["approve"], [resource]) && status !== "DRAFT";
    const canReject = useIsAuthorizedTo(["reject"], [resource]) && status !== "DRAFT";
    const canRequestApproval = status === "DRAFT" && commercialPriceItems?.length > 0 && authorizedToRequest;

    const onApprove = () => {
        refetchPlan();
        refetchPrice();
    };

    const onApprovalRequest = () => {
        if (!canRequestApproval) return;

        const title = t("actions.request.title");
        sendRequest({
            data: {
                status: "AWAITING_APPROVAL",
            },
        })
            .then(() => {
                refetchPrice();
                toast({
                    status: "success",
                    title,
                    description: t("actions.request.toast.success.description"),
                });
            })
            .catch(() => {
                toast({
                    status: "error",
                    title,
                    description: t("actions.request.toast.error.description"),
                });
            });
    };

    return (
        <HStack width="100%">
            <VStack alignItems="flex-start" spacing={3} flex={1}>
                <HStack spacing={3}>
                    <Text fontWeight="bold">{t("heading")}</Text>
                    <PriceStatusTag status={status} />
                </HStack>
                <Text>{t("information")}</Text>
            </VStack>
            {canRequestApproval && (
                <Button variant="primary" isDisabled={!canRequestApproval} onClick={onApprovalRequest}>
                    {t("actions.request.title")}
                </Button>
            )}

            {canReject && <RejectPrice price={price} refetchPrice={refetchPrice} />}
            {canApprove && <ApprovePrice price={price} refetchPrice={onApprove} />}
        </HStack>
    );
};
