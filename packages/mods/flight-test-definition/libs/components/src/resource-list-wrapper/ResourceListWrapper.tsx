import type { ReactElement } from "react";
import { EmptyListMessage } from "../empty-list-message/EmptyListMessage";

export type ResourceListWrapperProps<T> = {
    list?: T[];
    emptyMessage: string;
    renderItem: (item: T, index: number) => ReactElement | null;
};

export const ResourceListWrapper = <T extends {}>(props: ResourceListWrapperProps<T>) => {
    const { emptyMessage, list, renderItem } = props;

    if (!list) {
        return null;
    }

    if (list.length === 0) {
        return <EmptyListMessage message={emptyMessage} />;
    }

    return <>{list.map(renderItem)}</>;
};
