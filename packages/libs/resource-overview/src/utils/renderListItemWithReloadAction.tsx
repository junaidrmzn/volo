import { Button } from "@volocopter/design-library-react";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import type { ResourceListItemOptions } from "@voloiq/resource-overview";
import type { BaseResource } from "../state-machine/BaseResource";

export const renderListItemWithReloadAction = (
    resource: BaseResource,
    cardListItemProps: CardListItemProps,
    options: ResourceListItemOptions
) => (
    <CardListItem {...cardListItemProps}>
        <CardListItem.Identifier>
            <Button
                onClick={() => {
                    options.reloadList();
                }}
            >
                {`ListItem ${resource.id}`}
            </Button>
        </CardListItem.Identifier>
    </CardListItem>
);
