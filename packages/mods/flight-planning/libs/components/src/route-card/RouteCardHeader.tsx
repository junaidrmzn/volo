import { Box, HStack, Icon, IconButton, Tag, Text, VStack } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useRouteCardTranslation } from "./translations";

export type RouteCardHeaderProps = {
    routeName: string;
    validationStatus?: string;
};
export const RouteCardHeader = (props: RouteCardHeaderProps) => {
    const { routeName, validationStatus } = props;
    const { t } = useRouteCardTranslation();

    const validityTag = match(validationStatus)
        .with("valid", () => (
            <Tag fontSize="md" colorScheme="base-subtle">
                {t("status.valid")}
            </Tag>
        ))
        .with("invalid", () => (
            <Tag fontSize="md" colorScheme="error-subtle">
                {t("status.invalid")}
            </Tag>
        ))
        .with("valid_with_limitations", () => (
            <Tag fontSize="xs" colorScheme="warning-subtle">
                {t("status.limited")}
            </Tag>
        ))
        .with("not_yet_validated", () => (
            <Tag fontSize="xs" colorScheme="warning-subtle">
                {t("status.not_yet_validated")}
            </Tag>
        ))
        .otherwise(() => null);

    return (
        <HStack w="100%" gap={1} alignItems="center" justifyContent="space-between">
            <VStack>
                <Text fontSize="sm" fontWeight="semibold">
                    {routeName}
                </Text>
            </VStack>
            <HStack>
                {validityTag}
                <Box>
                    <IconButton aria-label={t("routeDetail")} variant="ghost" size="sm">
                        <Icon icon="chevronRight" size={4} />
                    </IconButton>
                </Box>
            </HStack>
        </HStack>
    );
};
