export const mapDateToInitialValue = (dateString?: string | null) => (dateString ? new Date(dateString) : undefined);

export const mapSelectOptionToInitialValue = <T extends string>(selectOptionString?: T | null) =>
    selectOptionString ? { value: selectOptionString } : undefined;
