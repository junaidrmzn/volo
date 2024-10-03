import { Grid } from "@volocopter/design-library-react";
import { FileCard } from "@voloiq/file-card";
import { ReadonlyResourceSectionContainer } from "@voloiq/flight-test-definition-components";
import type { AttachedFile } from "../../attached-files/attached-files-card-list/AttachedFilesCard";
import { useFlightTestDefinitionChangesReviewTranslation } from "./translations/useFlightTestDefinitionChangesReviewTranslation";

export type AttachedFilesChangesReviewProps = {
    attachedFiles: AttachedFile[];
};

export const AttachedFilesChangesReview = (props: AttachedFilesChangesReviewProps) => {
    const { attachedFiles } = props;
    const { t } = useFlightTestDefinitionChangesReviewTranslation();

    return (
        <ReadonlyResourceSectionContainer
            sectionTitle={t("Attached Files", { attachedFilesCount: attachedFiles.length })}
        >
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {attachedFiles.map((attachedFile) => (
                    <FileCard key={attachedFile.id} {...attachedFile} onDownload={() => {}} isReadonly />
                ))}
            </Grid>
        </ReadonlyResourceSectionContainer>
    );
};
