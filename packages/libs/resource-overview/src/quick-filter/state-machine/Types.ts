export type QuickFilter = {
    propertyName: string;
    value: string | number | boolean;
};

export type QuickFilterProperty = QuickFilter & {
    displayName: string;
};
