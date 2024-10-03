import { useEffect } from "react";
import { useForm } from "@voloiq/form";
import type { FilePrefillMetadata } from "../useCreateLogPage";

export const useMetadataFormFields = (prefillMetadata?: FilePrefillMetadata) => {
    const { setValue, getFieldState, schema } = useForm();

    useEffect(() => {
        if (prefillMetadata && prefillMetadata.metadataRequestStatus === "success" && !getFieldState("date").isDirty) {
            setValue("date", prefillMetadata.timestamp);
        }
    }, [getFieldState, prefillMetadata, setValue]);

    return {
        schema,
    };
};
