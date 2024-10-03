import { useGetService } from "@voloiq/service";
import { Negotiate } from "./negotiate";

export type UseGetNegotiateOptions = {
    manual?: boolean;
};

export const useGetNegotiate = (options: UseGetNegotiateOptions = {}) =>
    useGetService<Negotiate>({
        route: "/notification/v1/negotiate",
        resourceId: "",
        options,
    });
