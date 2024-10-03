import { Card, Flex, HStack, Radio, Tag, Text, VStack } from "@volocopter/design-library-react";
import type { RouteOption } from "@voloiq-typescript-api/network-scheduling-types";
import type { Vertiport } from "@voloiq-typescript-api/vertiport-management-types";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

export type RouteOptionCardProps = {
    routeOption: RouteOption;
    vertiports: Vertiport[];
};

export const RouteOptionCard = (props: RouteOptionCardProps) => {
    const { routeOption, vertiports } = props;
    const { id, name, validForOperation, arrivalVertiportId, departureVertiportId } = routeOption;
    const { t } = useMissionTranslations();

    const arrivalVertiport = vertiports.find((vertiport) => vertiport.id === arrivalVertiportId);
    const departureVertiport = vertiports.find((vertiport) => vertiport.id === departureVertiportId);

    return (
        <Card px={2} py={2} my={3}>
            <Flex borderRadius="sm">
                <HStack width="50%" alignItems="flex-start">
                    <Radio value={`${id}`} size="sm" aria-label={t("RouteOption")} />
                    <VStack spacing={0} alignItems="flex-start">
                        <Text fontSize="sm" lineHeight={6}>
                            {name}
                        </Text>
                        <Text fontSize="sm" lineHeight={6} align="left">
                            {arrivalVertiport?.name ? arrivalVertiport.name : ""}
                            {departureVertiport?.name ? `, ${departureVertiport?.name}` : ""}
                        </Text>
                    </VStack>
                </HStack>
                <VStack spacing={0} alignItems="flex-end" width="50%">
                    <Tag colorScheme={validForOperation ? "blue" : "error-subtle"}>
                        <Tag.Label variant="light">
                            {validForOperation
                                ? t("routeOptionAssignment.filters.validForOperation.isValid")
                                : t("routeOptionAssignment.filters.validForOperation.isNotValid")}
                        </Tag.Label>
                    </Tag>
                </VStack>
            </Flex>
        </Card>
    );
};
