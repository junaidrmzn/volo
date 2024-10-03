import { useStepsContext } from "@volocopter/steps-react";
import { useEffect } from "react";
import type { FileEntry } from "../../../libs/logbook/file-entry";

type UseFileUploadStepProps = {
    fileEntries: FileEntry[];
};

export const useFileUploadStep = (props: UseFileUploadStepProps) => {
    const { fileEntries } = props;
    const { setIsNextStepEnabled } = useStepsContext();

    useEffect(() => {
        if (fileEntries) {
            setIsNextStepEnabled(fileEntries.length > 0);
        }
    }, [fileEntries, setIsNextStepEnabled]);
};
