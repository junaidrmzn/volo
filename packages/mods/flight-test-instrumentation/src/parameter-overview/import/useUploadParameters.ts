import { useToast } from "@volocopter/design-library-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "@voloiq/routing";
import type { AxiosRequestConfig } from "@voloiq/service";
import { useImportParameters } from "../../libs/fti-api";
import { useFtiImportTranslation } from "./translations/useFtiImportTranslation";

export const useUploadParameters = () => {
    const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useFtiImportTranslation();

    const onUploadProgress = useCallback((event: ProgressEvent) => {
        const { loaded, total } = event;
        const percentage = (loaded / total) * 100;
        setFileUploadPercentage(percentage);
    }, []);

    const { data, create, state, error } = useImportParameters({
        config: {
            onUploadProgress,
            baseURL: `${BACKEND_BASE_URL}/ftd/v2`,
        },
    });

    useEffect(() => {
        if (!data) {
            return;
        }

        toast({
            status: "success",
            title: t("successToast.title"),
            description: t("successToast.description", {
                parameterCount: data.parametersCreated,
            }),
        });
        navigate("..");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const importParameters = async (config: AxiosRequestConfig<File>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        setFileName(config.data!.name);
        await create(config);
    };

    return {
        error,
        fileName,
        fileUploadPercentage,
        state,
        importParameters,
        setFileUploadPercentage,
    };
};
