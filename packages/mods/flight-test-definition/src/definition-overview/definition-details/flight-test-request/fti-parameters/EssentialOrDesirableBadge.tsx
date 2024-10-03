import { Box } from "@volocopter/design-library-react";
import { useFtiParametersTranslation } from "./translations/useFtiParametersTranslation";

export type EssentialOrDesirableBadgeProps = {
    isEssential?: boolean;
};

export const EssentialOrDesirableBadge = (props: EssentialOrDesirableBadgeProps) => {
    const { isEssential } = props;
    const { t } = useFtiParametersTranslation();

    return (
        <Box
            borderRadius="sm"
            px={1.5}
            py={0}
            fontSize="xs"
            lineHeight={6}
            fontWeight="bold"
            bgColor={isEssential ? "orange.100" : "indigo.200"}
        >
            {isEssential ? t("Essential") : t("Desirable")}
        </Box>
    );
};
