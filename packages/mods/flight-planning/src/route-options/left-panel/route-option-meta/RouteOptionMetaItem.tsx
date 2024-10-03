import { HStack, Icon, IconButton, Tag, Text, VStack, useDisclosure } from "@volocopter/design-library-react";
import { TextWithLabel } from "@voloiq/text-layouts";
import { SelectAircraft } from "../modal-popups/SelectAircraft";
import { Settings } from "../modal-popups/Settings";
import { useRouteOptionMetaTranslation } from "./translations";

type RouteOptionMetaItemProps = {
    label: string;
    text: string;
    weatherScenarios?: string[];
};

export const RouteOptionMetaItem = (props: RouteOptionMetaItemProps) => {
    const { label, text, weatherScenarios } = props;
    const { t } = useRouteOptionMetaTranslation();

    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <>
            <HStack w="100%" bg="bgContentLayer" borderRadius="xs" px={3} py={2}>
                <VStack w="100%" alignItems="flex-start" spacing={0}>
                    <TextWithLabel size="small" label={label} text={text} />

                    {!text && weatherScenarios && weatherScenarios.length > 0 && (
                        <HStack pt={3}>
                            {weatherScenarios.map((scenario) => (
                                <Tag key={scenario} colorScheme="gray-subtle" isSelected>
                                    <Text fontSize="sm" fontWeight="semibold">
                                        {scenario}
                                    </Text>
                                </Tag>
                            ))}
                        </HStack>
                    )}
                </VStack>
                {!weatherScenarios && (
                    <IconButton
                        aria-label={t("edit")}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            onOpen();
                        }}
                    >
                        <Icon icon="penWithBox" size={3.5} />
                    </IconButton>
                )}
            </HStack>
            {isOpen && <SelectAircraft selectedAircraft={text} isOpen={isOpen} onClose={onClose} />}

            {label === t("settings.title") && <Settings isOpen={isOpen} onClose={onClose} />}
        </>
    );
};
