import { useEffect, useState } from "react";
import { UseFormSetValue } from "@voloiq/form";
import { FormValues } from "./utils";

export const useSampleRate = (sampleRate: number, setValue: UseFormSetValue<FormValues>, exportFileType: string) => {
    const [storedSampleRate, setStoredSampleRate] = useState(sampleRate);
    const [isSampleRateDisabled, setIsSampleRateDisabled] = useState(false);

    useEffect(() => {
        if (exportFileType === "HDF5") {
            setStoredSampleRate(sampleRate);
            setIsSampleRateDisabled(true);
            setValue("sampleRate", "");
        } else if (isSampleRateDisabled) {
            setValue("sampleRate", storedSampleRate);
            setIsSampleRateDisabled(false);
        } else {
            setStoredSampleRate(sampleRate);
        }
    }, [exportFileType]);

    return { storedSampleRate, isSampleRateDisabled };
};
