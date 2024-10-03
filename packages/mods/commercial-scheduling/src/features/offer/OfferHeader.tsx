import { Button, HStack, Text, VStack, useToast } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Offer, useUpdateOfferStatus } from "@voloiq/commercial-scheduling-api/v1";
import { OfferStatusTag } from "@voloiq/commercial-scheduling-components";
import { ApproveOffer } from "./actions/approve/ApproveOffer";
import { RejectOffer } from "./actions/reject/RejectOffer";
import { useOfferTranslation } from "./translations/useOfferTranslation";

type OfferHeaderProps = {
    offer: Offer;
    refetchOffer: () => void;
    refetchPlan: () => void;
};

export const OfferHeader = (props: OfferHeaderProps) => {
    const { offer, refetchOffer, refetchPlan } = props;
    const { id, status, commercialOfferItems } = offer;
    const resource = "CommercialOffering";
    const authorizedToRequest = useIsAuthorizedTo(["request-approval"], [resource]);
    const canApprove = useIsAuthorizedTo(["approve"], [resource]) && status !== "DRAFT";
    const canReject = useIsAuthorizedTo(["reject"], [resource]) && status !== "DRAFT";
    const canRequestApproval = status === "DRAFT" && commercialOfferItems?.length > 0 && authorizedToRequest;
    const { t } = useOfferTranslation();
    const toast = useToast();
    const { sendRequest } = useUpdateOfferStatus(id);

    const onApprove = () => {
        refetchPlan();
        refetchOffer();
    };

    const onApprovalRequest = () => {
        if (!canRequestApproval) return;

        const title = t("actions.request.title");
        sendRequest({ data: { status: "AWAITING_APPROVAL" } })
            .then(() => {
                refetchOffer();
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
                    <OfferStatusTag status={status} />
                </HStack>
                <Text>{t("information")}</Text>
            </VStack>
            {canRequestApproval && (
                <Button variant="primary" isDisabled={!canRequestApproval} onClick={onApprovalRequest}>
                    {t("actions.request.title")}
                </Button>
            )}
            {canReject && <RejectOffer offer={offer} refetchOffer={refetchOffer} />}
            {canApprove && <ApproveOffer offer={offer} refetchOffer={onApprove} />}
        </HStack>
    );
};
