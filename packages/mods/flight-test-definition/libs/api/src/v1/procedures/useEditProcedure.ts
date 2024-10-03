import type { AxiosRequestConfig, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { useService } from "@voloiq/service";
import type { ProcedurePatch, ProcedureRead } from "./apiModels";

export type UseEditProcedureOptions = {
    definitionId: string;
    procedureId: string;
};

export type EditProcedureRequest = AxiosRequestConfig<ProcedurePatch> | undefined;
export type EditProcedureResponse = ProcedureRead | undefined;

export const useEditProcedure = (options: UseEditProcedureOptions) => {
    const { definitionId, procedureId } = options;

    const { axiosInstance, baseUrl } = useService();

    const editProcedure = async (config: EditProcedureRequest): Promise<EditProcedureResponse> => {
        const {
            data: { data },
            // We cannot use the usePatch hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.patch<
            ResponseEnvelope<ProcedureRead>,
            AxiosResponse<ResponseEnvelope<ProcedureRead>>,
            ProcedurePatch
        >(`${baseUrl}/ftd/v1/definitions/${definitionId}/procedures/${procedureId}`, config?.data, {
            ...config,
            withCredentials: true,
        });

        return data;
    };

    return { editProcedure };
};
