import type { CardListItemProps } from "@voloiq/card-list-item";
import { CardListItem } from "@voloiq/card-list-item";
import type { BaseResource } from "../state-machine/BaseResource";

export const renderListItemWithId = (resource: BaseResource, cardListItemProps: CardListItemProps) => (
    <CardListItem {...cardListItemProps}>
        <CardListItem.Identifier>{`ListItem ${resource.id}`}</CardListItem.Identifier>
    </CardListItem>
);
