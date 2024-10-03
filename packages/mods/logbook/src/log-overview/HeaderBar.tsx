import { Flex, Text } from "@volocopter/design-library-react";
import { useLogbookTranslation } from "./translations/useLogbookTranslation";

type HeaderBarProps = {
    entryCount: number;
};

export const HeaderBar = (props: HeaderBarProps) => {
    const { entryCount } = props;
    const { t } = useLogbookTranslation();

    return (
        <Flex alignItems="center">
            <Text display="inline-block">{t("overview.headerBar.entryCountLabel", { entryCount })}</Text>
        </Flex>
    );
};
