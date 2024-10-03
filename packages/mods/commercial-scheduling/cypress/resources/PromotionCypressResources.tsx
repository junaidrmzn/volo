import { Discount, EarlyAccess, anyDiscount, anyEarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import { Route } from "@voloiq/routing";
import { PromotionItem } from "../../src/features/promotion-item/PromotionItem";
import { Promotion } from "../../src/features/promotion/Promotion";
import {
    getDiscountDetailInterceptor,
    getDiscountInterceptor,
    getPromotionItemInterceptor,
    getRegionsInterceptor,
    publishPromotionItemInterceptor,
    uploadDiscountInterceptor,
} from "../interceptors";
import {
    getEarlyAccessDetailInterceptor,
    getEarlyAccessInterceptor,
    uploadEarlyAccessInterceptor,
} from "../interceptors/earlyAcessInterceptor";
import { CypressServiceProvider } from "./CypressResources";

type SetupDiscountInterceptorsOptions = {
    discount?: Discount;
};

type SetupEarlyAccessInterceptorsOptions = {
    earlyAccess?: EarlyAccess;
};

export const mountPromotion = () => {
    cy.mount(
        <CypressServiceProvider initialEntries={["/overview"]}>
            <Route path="overview/*" element={<Promotion />} />
            <Route path="overview/:promotionId/*" element={<PromotionItem />} />
        </CypressServiceProvider>
    );
};

export const setupDiscountInterceptors = (options: SetupDiscountInterceptorsOptions = {}) => {
    const { discount = anyDiscount() } = options;

    getRegionsInterceptor();
    getDiscountInterceptor(discount);
    uploadDiscountInterceptor(discount);
    getDiscountDetailInterceptor(discount.id);
    getPromotionItemInterceptor(discount.id);
    publishPromotionItemInterceptor(discount.id);
};

export const setupEarlyAccessInterceptors = (options: SetupEarlyAccessInterceptorsOptions = {}) => {
    const { earlyAccess = anyEarlyAccess() } = options;
    getRegionsInterceptor();
    getEarlyAccessInterceptor(earlyAccess);
    uploadEarlyAccessInterceptor(earlyAccess);
    getEarlyAccessDetailInterceptor(earlyAccess.id);
    getPromotionItemInterceptor(earlyAccess.id);
    publishPromotionItemInterceptor(earlyAccess.id);
};
