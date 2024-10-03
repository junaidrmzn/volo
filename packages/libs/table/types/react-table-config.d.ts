/* eslint-disable prefer-type-alias/prefer-type-alias */
import type {
    Accessor,
    ColumnInterfaceBasedOnValue,
    IdType,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseRowSelectHooks,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseSortByColumnOptions,
    UseSortByColumnProps,
    UseSortByHooks,
    UseSortByInstanceProps,
    UseSortByOptions,
    UseSortByState,
} from "react-table";

declare module "react-table" {
    // take this file as-is, or comment out the sections that don't apply to your plugin configuration

    export interface TableOptions<D extends Record<string, unknown>>
        extends UsePaginationOptions<D>,
            UseRowSelectOptions<D>,
            UseSortByOptions<D>,
            // note that having Record here allows you to add anything to the options, this matches the spirit of the
            // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
            // feature set, this is a safe default.
            Record<string, unknown> {}

    export interface Hooks<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseRowSelectHooks<D>,
            UseSortByHooks<D> {}

    export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UsePaginationInstanceProps<D>,
            UseRowSelectInstanceProps<D>,
            UseSortByInstanceProps<D> {}

    export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
        extends UsePaginationState<D>,
            UseRowSelectState<D>,
            UseSortByState<D> {}

    export interface ColumnInterface<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseSortByColumnOptions<D> {}

    export interface ColumnInstance<D extends Record<string, unknown> = Record<string, unknown>>
        extends UseSortByColumnProps<D> {}

    export interface Row<D extends Record<string, unknown> = Record<string, unknown>> extends UseRowSelectRowProps<D> {}

    type SimpleColumnInterface<D extends object = {}> = Pick<ColumnInterface<D>, "Header" | "id">;

    export type ColumnDefinition<D extends object = {}> = SimpleColumnInterface<D> &
        ColumnInterfaceBasedOnValue<D> &
        ({ Header: string } | { id: IdType<D>; accessor?: Accessor<D> } | { accessor: keyof D });
}
