import { useGetPromotion } from "@voloiq/commercial-scheduling-api/v1";
import { useNavigate, useParams } from "@voloiq/routing";

export const usePromotionItem = () => {
    const { promotionId } = useParams();
    const { data: promotion, refetchDataWithResponseEnvelope } = useGetPromotion(promotionId ?? "-1");
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate({ pathname: `/commercial-scheduling/promotion/overview` });
    };

    const refetchPromotion = () => {
        refetchDataWithResponseEnvelope();
    };

    return { promotion, refetchPromotion, navigateBack };
};
