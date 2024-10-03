import type { AxiosRequestConfig, AxiosResponse, ResponseEnvelope } from "@voloiq/service";
import { useService } from "@voloiq/service";
import type { FlightTestOrder, FlightTestOrderPatch } from "./apiModels";

export type EditFlightTestOrderRequest = AxiosRequestConfig<FlightTestOrderPatch> | undefined;
export type EditFlightTestOrderResponse = FlightTestOrder | undefined;

export const useEditFlightTestOrder = (flightTestOrderId: string) => {
    const { axiosInstance, baseUrl } = useService();

    const editFlightTestOrder = async (config: EditFlightTestOrderRequest): Promise<EditFlightTestOrderResponse> => {
        const {
            data: { data },
            // We cannot use the usePatch hook here directly, because this causes the request to be cancelled
            // if the hook unmounts while the request is still pending
        } = await axiosInstance.patch<
            ResponseEnvelope<FlightTestOrder>,
            AxiosResponse<ResponseEnvelope<FlightTestOrder>>,
            FlightTestOrderPatch
        >(`${baseUrl}/ftd/v1/orders/${flightTestOrderId}`, config?.data, {
            ...config,
            withCredentials: true,
        });

        return data;
    };

    return { editFlightTestOrder };
};
