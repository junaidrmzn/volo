import { useEffect, useState } from "react";
import type { FormValues, SelectOption } from "@voloiq/form";
import { useNavigate } from "@voloiq/routing";
import { useGetAllAircraft } from "../../libs/fti-api/useAircraft";
import type { useImportFormSchema } from "./form/useImportFormSchema";
import { useUploadParameters } from "./useUploadParameters";

export const useImportPage = () => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const navigate = useNavigate();
    const goBackToOverview = () => navigate("..");
    const { data: aircraft, state: aircraftState, sendRequest: refetchAircraft } = useGetAllAircraft();
    const {
        error,
        fileName,
        fileUploadPercentage,
        state: uploadState,
        importParameters,
        setFileUploadPercentage,
    } = useUploadParameters();

    const retryImport = () => {
        setFileUploadPercentage(0);
        setIsFormSubmitted(false);
    };

    const handleSubmit = (data: FormValues<ReturnType<typeof useImportFormSchema>>) => {
        importParameters({
            data: data.files[0],
            params: {
                aircrafts: encodeURI(
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    (data.aircraft as SelectOption<string>[]).map((aircraft) => `${aircraft.value}`).join(",")
                ),
            },
        });
    };

    useEffect(() => {
        if (uploadState !== "idle") {
            setIsFormSubmitted(true);
        }
    }, [uploadState]);

    return {
        aircraft,
        aircraftState,
        error,
        fileName,
        fileUploadPercentage,
        isFormSubmitted,
        uploadState,
        handleSubmit,
        retryImport,
        goBackToOverview,
        refetchAircraft,
    };
};
