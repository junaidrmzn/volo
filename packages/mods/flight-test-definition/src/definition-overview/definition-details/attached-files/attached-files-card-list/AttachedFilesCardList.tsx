import { Grid } from "@volocopter/design-library-react";
import type { AttachedFile } from "./AttachedFilesCard";
import { AttachedFileCard } from "./AttachedFilesCard";

export type AttachedFilesCardListProps = {
    attachedFiles: AttachedFile[];
    onFileDeleteSuccess: () => void;
};
export const AttachedFilesCardList = (props: AttachedFilesCardListProps) => {
    const { attachedFiles, onFileDeleteSuccess } = props;

    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {attachedFiles.map((attachedFile) => (
                <AttachedFileCard
                    key={attachedFile.id}
                    attachedFile={attachedFile}
                    onFileDeleteSuccess={onFileDeleteSuccess}
                />
            ))}
        </Grid>
    );
};
