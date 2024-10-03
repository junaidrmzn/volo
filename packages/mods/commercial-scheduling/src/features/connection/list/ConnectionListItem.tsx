import { CardListItemProps, Text, VStack } from "@volocopter/design-library-react";
import { CardListItem } from "@voloiq/card-list-item";
import { Connection } from "@voloiq/commercial-scheduling-api/v1";
import { useFormatDateTime } from "@voloiq/dates";
import { IdentifierStack, TextWithLabel } from "@voloiq/text-layouts";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";

export type ConnectionListItemProps = {
    connection: Connection;
} & CardListItemProps;

export const ConnectionListItem = (props: ConnectionListItemProps) => {
    const { connection, onClick, isSelected } = props;
    const { formatDateTime } = useFormatDateTime();
    const { t } = useConnectionTranslation();

    return (
        <CardListItem key={connection.id} onClick={onClick!} ariaLabel={connection.name} isSelected={isSelected}>
            <CardListItem.Identifier>
                <IdentifierStack
                    mainIdentifier={connection.name}
                    secondaryIdentifier={connection.regionName ?? t("generic.not available")}
                    thirdIdentifier={`${connection.departureVertiportCode ?? t("generic.not available")} - ${
                        connection.arrivalVertiportCode ?? t("generic.not available")
                    }`}
                />
            </CardListItem.Identifier>
            <CardListItem.AdditionalContent>
                <TextWithLabel
                    label={t("model.flightDuration")}
                    text={`${connection.flightDuration} ${t("model.minutes")}`}
                />
            </CardListItem.AdditionalContent>
            <CardListItem.Status>
                <VStack align="flex-end" height="full" justifyContent="end">
                    <Text>
                        {formatDateTime(connection.validFrom)}
                        {" - "}
                        {connection.validTo ? formatDateTime(connection.validTo) : t("generic.not available")}
                    </Text>
                </VStack>
            </CardListItem.Status>
        </CardListItem>
    );
};
