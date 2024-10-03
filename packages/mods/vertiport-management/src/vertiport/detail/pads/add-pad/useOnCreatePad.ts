import type { PadService } from "@voloiq-typescript-api/vertiport-management-types";
import type { OnCreateHandler } from "@voloiq/form";
import type { PadCreate, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useRequestWithErrorHandling } from "../../../../errors/useRequestWithErrorHandling";
import { usePadForm } from "../forms/usePadForm";
import type { PadFormSchema } from "../forms/usePadFormSchema";
import { usePads } from "../pads-context/usePads";

export type UseOnCreatePadOptions = {
    onSuccessfulCreate?: () => void;
    vertiport: Vertiport;
};

export const useOnCreatePad = (options: UseOnCreatePadOptions) => {
    const { onSuccessfulCreate, vertiport } = options;
    const { addPad } = usePads();
    const { isPadFieldName, padsFormSchema } = usePadForm({ vertiport });
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: addPad,
        schema: padsFormSchema,
        isFieldName: isPadFieldName,
    });

    const onCreate: OnCreateHandler<PadFormSchema> = async (formData) => {
        const coordinate = formData.coordinates.split(",").map((value) => value.trim());
        const data: PadCreate = {
            padKey: formData.padKey,
            externalId: formData.externalId,
            validFrom: formData.validFrom.toISOString(),
            validTo: formData.validTo?.toISOString(),
            services:
                formData.services &&
                Object.values(formData.services).map((service) => {
                    return service.value as PadService;
                }),
            location: {
                longitude: Number(coordinate[1]) ?? 0,
                latitude: Number(coordinate[0]) ?? 0,
                height: formData.height,
            },
        };
        const response = await makeRequestWithErrorHandling(data);
        if (Object.keys(response).length === 0) {
            onSuccessfulCreate?.();
        }
        return response;
    };

    return { onCreate };
};
