import { AttachedFilesSection } from "./AttachedFilesSection";
import { AttachedFilesProvider } from "./attached-files-context/AttachedFilesProvider";

export const AttachedFiles = () => {
    return (
        <AttachedFilesProvider>
            <AttachedFilesSection />
        </AttachedFilesProvider>
    );
};
