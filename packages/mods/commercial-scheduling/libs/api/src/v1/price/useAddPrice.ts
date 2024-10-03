import { useCreateService } from "@voloiq/service";
import { PRICE_BASE_URL } from "../../serviceEndpoints";
import { Price, PricePayload } from "./apiModels";

export const useAddPrice = (priceId: string) =>
    useCreateService<PricePayload, Price>({
        route: `${PRICE_BASE_URL}/${priceId}/commercial-price-items/all-days-all-routes`,
    });
