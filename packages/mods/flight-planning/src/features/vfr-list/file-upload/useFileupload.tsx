import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useGetUploadLink } from "../../../api-hooks/vfr-layers/getUploadLink";
import { uploadTileFile } from "../../../api-hooks/vfr-layers/uploadTileFile";

type UploadStatus = {
    status: "idle" | "pending" | "success";
    percentage: number;
};

export const useFileupload = () => {
    const [file, setFile] = useState<File[]>([]);
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
        percentage: 0,
        status: "idle",
    });
    const [uploadTileId, setUploadTileId] = useState("");
    const queryClient = useQueryClient();

    // request will only get executed if there is a uploadTileId
    const { requestUploadLink } = useGetUploadLink();

    const onUploadProgress = (percentage: number) => {
        setUploadStatus((previousState: UploadStatus) => ({ ...previousState, percentage }));
    };

    const uploadFile = async (uploadUrl: string) => {
        await uploadTileFile(uploadUrl, file[0]!, onUploadProgress);
        setFile([]);
        setUploadStatus((previousState: UploadStatus) => ({ ...previousState, status: "idle", percentage: 0 }));
        queryClient.invalidateQueries("vfrLayer");
    };

    const changeUploadTileId = (uploadTileId: string) => {
        setUploadTileId(uploadTileId);
    };

    const handleDelete = () => {
        setFile([]);
    };

    useEffect(() => {
        const requestLink = async () => {
            const { data: response } = await requestUploadLink(uploadTileId);
            setUploadStatus((previousState: UploadStatus) => ({
                ...previousState,
                status: "pending",
            }));
            if (response) uploadFile(response.url);
        };

        if (uploadTileId !== "") requestLink();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadTileId]);

    return {
        file,
        setFile,
        handleDelete,
        changeUploadTileId,
        uploadStatus,
    };
};
