import { useGetService } from "@voloiq/service";
import { FullEnvelopeValidation } from "./models";

type UseGetFullEnvelopeValidationOptions = {
    routeId: string | number;
    manual: boolean;
};
export const useGetFullEnvelopeValidation = (options: UseGetFullEnvelopeValidationOptions) => {
    const { routeId, manual } = options;

    return useGetService<FullEnvelopeValidation>({
        route: `/routes/${routeId}/full-envelope-validation`,
        resourceId: "",
        options: { manual },
    });
};
