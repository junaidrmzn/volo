import { Flex, Icon, IconButton, Tag, Text } from "@volocopter/design-library-react";
import { useScheduledMissionTranslation } from "../translations/useScheduledMissionTranslation";

export const TodosSection = () => {
    const { t } = useScheduledMissionTranslation();

    return (
        <Flex width="100%" alignItems="center" justifyContent="flex-start">
            <Tag colorScheme="gray">
                <Flex height={6} width="100%" alignItems="center" justifyContent="flex-start" gap={1}>
                    <IconButton aria-label={t("todos.bulletListAriaLabel")} variant="ghost" minWidth={0}>
                        <Icon icon="bulletedList" marginRight={1} size={3} />
                    </IconButton>
                    <Tag.Label>
                        <Text fontSize="sm" lineHeight="xl" fontWeight="bold">
                            {t("todos.todosText", { totalToDos: 0 })}
                        </Text>
                    </Tag.Label>
                </Flex>
            </Tag>
        </Flex>
    );
};
