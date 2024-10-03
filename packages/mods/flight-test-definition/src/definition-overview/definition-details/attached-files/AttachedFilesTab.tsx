import { Tab } from "@volocopter/design-library-react";
import { useAttachedFilesTranslation } from "./translations/useAttachedFilesTranslation";

export type AttachedFilesTabProps = {
    attachedFilesCount?: number;
};

export const AttachedFilesTab = (props: AttachedFilesTabProps) => {
    const { t } = useAttachedFilesTranslation();
    const { attachedFilesCount } = props;
    return (
        <Tab>
            {t("Attached Files")}
            {attachedFilesCount !== undefined && ` (${attachedFilesCount})`}
        </Tab>
    );
};
