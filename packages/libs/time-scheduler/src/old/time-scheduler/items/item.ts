export type Item<T = {}> = {
    id: string;
    /**
     * Will display items with different groups in different rows when defined.
     */
    group?: string;
    startDate: Date;
    endDate: Date;
    height?: string | number;
} & T;

export type ItemRow<T = {}> = Item<T>[];
export type ItemRows<T = {}> = ItemRow<T>[];
