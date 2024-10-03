import { HStack, Tag } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useDefinitionStatusTagTranslation } from "./translations/useDefinitionStatusTagTranslation";

export type DefinitionStatusTagProps = {
    status: "DRAFT" | "APPROVED";
};

export const DefinitionStatusTag = (props: DefinitionStatusTagProps) => {
    const { status } = props;

    const { t } = useDefinitionStatusTagTranslation();

    return (
        <HStack spacing={6} height="2rem">
            <Tag
                colorScheme={match(status)
                    .with("DRAFT", () => "teal" as const)
                    .with("APPROVED", () => "blue" as const)
                    .exhaustive()}
            >
                {match(status)
                    .with("DRAFT", () => t("Draft"))
                    .with("APPROVED", () => t("Released"))
                    .exhaustive()}
            </Tag>
        </HStack>
    );
};
