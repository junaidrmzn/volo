import { Td, Text, Tr } from "@volocopter/design-library-react";
import { PromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { PromotionItemStatusTag } from "@voloiq/commercial-scheduling-components";
import { InvalidatePromotionItem } from "./actions/invalidate/InvalidatePromotionItem";
import { ValidatePromotionItem } from "./actions/validate/ValidatePromotionItem";

type PromotionTableRowProps = {
    promotionItem: PromotionItem;
    reloadList: () => void;
};

export const PromotionTableRow = (props: PromotionTableRowProps) => {
    const { promotionItem, reloadList } = props;
    const { status, code } = promotionItem;
    const canBeInvalidated = status !== "INVALIDATED";

    return (
        <Tr aria-label={code}>
            <Td>
                <PromotionItemStatusTag status={status} />
            </Td>
            <Td>
                <Text fontWeight="bold">{code}</Text>
            </Td>
            <Td>
                <Text>-</Text>
            </Td>
            <Td>
                <Text>-</Text>
            </Td>
            <Td>
                <Text>-</Text>
            </Td>
            <Td>
                {canBeInvalidated && (
                    <InvalidatePromotionItem promotionItem={promotionItem} refetchPromotion={reloadList} />
                )}
                {!canBeInvalidated && (
                    <ValidatePromotionItem promotionItem={promotionItem} refetchPromotion={reloadList} />
                )}
            </Td>
        </Tr>
    );
};
