import { Tag } from "@volocopter/design-library-react";
import { useMissionTranslations } from "./translations/useMissionTranslations";

export const SynchronizedWithLeonTag = () => {
    const { t } = useMissionTranslations();

    return (
        <Tag colorScheme="info-subtle">
            <Tag.Label variant="light">{t("leon")}</Tag.Label>
        </Tag>
    );
};
