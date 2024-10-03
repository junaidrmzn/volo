import { HStack, Text } from "@volocopter/design-library-react";
import { useRevisionTranslation } from "./translations/useRevisionTranslation";

type RevisionOptionLabelProps = {
    label: string;
    isReleased: boolean;
    revision: string;
};

export const RevisionOptionLabel = (props: RevisionOptionLabelProps) => {
    const { isReleased, label, revision } = props;
    const { t } = useRevisionTranslation();
    return (
        <HStack aria-label={t(`Revision Dropdown Option Aria-label`, { revision })}>
            <Text>{label}</Text>(
            <Text color={!isReleased ? "focusBasic" : "unset"}>
                {isReleased ? `(${t("Revision Read only")})` : `(${t("Revision Unreleased")})`}
            </Text>
            )
        </HStack>
    );
};
