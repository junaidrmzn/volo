import type { GroupBase, OptionBase, OptionsOrGroups } from "@volocopter/design-library-react";

export type BaseSelectOption = { label?: string; value: string };

/** @see {isSelectOption} ts-auto-guard:type-guard */
export type SelectOption = BaseSelectOption & OptionBase;

export type SelectAsyncCallback =
    | ((
          inputValue: string,
          callback: (options: OptionsOrGroups<SelectOption, GroupBase<SelectOption>>) => void
      ) => void)
    | ((inputValue: string) => Promise<OptionsOrGroups<SelectOption, GroupBase<SelectOption>>>);

export type SelectProps = {
    name: string;
    label?: string;
    options?: SelectOption[];
    isDisabled?: boolean;
    isMulti?: boolean;
    asyncSelectCallback?: SelectAsyncCallback;
};
