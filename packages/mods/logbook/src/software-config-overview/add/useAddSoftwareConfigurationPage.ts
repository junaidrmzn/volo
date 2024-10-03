import { useCallback, useState } from "react";
import { useCreateSoftwareConfiguration } from "../../libs/software-configuration/useSoftwareConfiguration";

export const useAddSoftwareConfigurationPage = () => {
    const [fileUploadPercentage, setFileUploadPercentage] = useState(0);

    const onUploadProgress = useCallback((event: ProgressEvent) => {
        const { loaded, total } = event;
        const percentage = (loaded / total) * 100;
        setFileUploadPercentage(percentage);
    }, []);

    const { create, state, error } = useCreateSoftwareConfiguration({ config: { onUploadProgress } });

    return {
        fileUploadPercentage,
        state,
        create,
        error,
    };
};
