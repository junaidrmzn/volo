import type { DoneInvokeEvent } from "xstate";
import { assign } from "xstate";
import type { ResponseEnvelope, SizeBasedPagination } from "@voloiq/service";
import type { ListContext } from "./ListContext";
import type { ChangePageEvent, SetContextEvent } from "./ListEvent";

export const loadList = <Resource>() =>
    assign<ListContext<Resource>, DoneInvokeEvent<ResponseEnvelope<Resource[]>>>({
        overviewData: (_, event) => event.data.data,
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        totalItems: (_, event) => (event.data.pagination as SizeBasedPagination)?.totalElements,
    });

export const changePage = <Resource>() =>
    assign<ListContext<Resource>, ChangePageEvent>({
        page: (_, event) => event.page,
    });

export const resetPage = <Resource>() =>
    assign<ListContext<Resource>, ChangePageEvent>({
        page: () => 1,
    });

export const setContext = <Resource>() =>
    assign<ListContext<Resource>, SetContextEvent<Resource>>({
        page: (_, event) => event.page,
        appliedFilterSet: (_, event) => event.appliedFilterSet,
        appliedSortingConfiguration: (_, event) => event.sortingConfiguration,
        appliedQuickFilter: (_, event) => event.appliedQuickFilter,
    });
