import type { OnEditHandler } from "@voloiq/form";
import type { PadService, PadUpdate, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useRequestWithErrorHandling } from "../../../../../../errors/useRequestWithErrorHandling";
import { usePadForm } from "../../../forms/usePadForm";
import type { PadFormSchema } from "../../../forms/usePadFormSchema";
import { usePads } from "../../../pads-context/usePads";

type UseOnEditPadOptions = {
    padId: string;
    onClose: () => void;
    vertiport: Vertiport;
};

export const useOnEditPad = (options: UseOnEditPadOptions) => {
    const { padId, onClose, vertiport } = options;
    const { editPad } = usePads();
    const { isPadFieldName, padsFormSchema } = usePadForm({ vertiport });
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: PadUpdate }) => editPad({ padId, data: requestConfig.data }),
        schema: padsFormSchema,
        isFieldName: isPadFieldName,
    });
    const onEdit: OnEditHandler<PadFormSchema> = async (formData) => {
        const coordinate = formData.coordinates.split(",").map((value) => value.trim());
        const data: PadUpdate = {
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
            onClose();
        }
        return response;
    };

    return { onEdit };
};
