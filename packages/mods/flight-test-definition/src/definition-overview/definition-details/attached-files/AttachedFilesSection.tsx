import { useQueryClient } from "@tanstack/react-query";
import { VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { SectionHeader } from "@voloiq/text-layouts";
import { UploadAttachedFileBox } from "./UploadAttachedFileBox";
import { UploadAttachedFileButton } from "./UploadAttachedFileButton";
import { AttachedFilesCardList } from "./attached-files-card-list/AttachedFilesCardList";
import { useAttachedFiles } from "./attached-files-context/useAttachedFiles";
import { useAttachedFilesTranslation } from "./translations/useAttachedFilesTranslation";

export const AttachedFilesSection = () => {
    const { t } = useAttachedFilesTranslation();
    const { attachedFiles } = useAttachedFiles();
    const queryClient = useQueryClient();

    const invalidateQueriesOnSucess = () => {
        queryClient.invalidateQueries(["tabCounters"]);
    };

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader label={t("Attached Files")}>
                <UploadAttachedFileButton onFileUploadSuccess={invalidateQueriesOnSucess} />
            </SectionHeader>
            {match(attachedFiles)
                .when(
                    () => attachedFiles.length === 0,
                    () => <UploadAttachedFileBox onFileUploadSuccess={invalidateQueriesOnSucess} />
                )
                .otherwise(() => (
                    <AttachedFilesCardList
                        attachedFiles={attachedFiles}
                        onFileDeleteSuccess={invalidateQueriesOnSucess}
                    />
                ))}
        </VStack>
    );
};
