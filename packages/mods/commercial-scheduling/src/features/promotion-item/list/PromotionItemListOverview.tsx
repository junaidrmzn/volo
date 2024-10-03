import { Discount, EarlyAccess, PromotionItem } from "@voloiq/commercial-scheduling-api/v1";
import { ResourceOverview, ResourceTableRowOptions } from "@voloiq/resource-overview";
import { PromotionTableRow } from "./PromotionTableRow";
import { usePromotionItemMachineConfig } from "./usePromotionItemMachineConfig";

export type PromotionItemListProps = {
    promotion: EarlyAccess | Discount;
};

export const PromotionItemListOverview = (props: PromotionItemListProps) => {
    const { promotion } = props;
    const { id } = promotion;
    const { promotionItemDetailMachineConfig } = usePromotionItemMachineConfig({
        promotionId: id,
    });

    return (
        <ResourceOverview<PromotionItem> machineConfig={promotionItemDetailMachineConfig}>
            <ResourceOverview.ActionBar />
            <ResourceOverview.TableRow>
                {(promotionItem: PromotionItem, options: ResourceTableRowOptions) => (
                    <PromotionTableRow promotionItem={promotionItem} {...options} />
                )}
            </ResourceOverview.TableRow>
        </ResourceOverview>
    );
};
