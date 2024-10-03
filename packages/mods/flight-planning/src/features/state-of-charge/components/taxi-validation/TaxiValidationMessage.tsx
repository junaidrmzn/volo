import { Box, Text } from "@volocopter/design-library-react";
import { useTaxiValidation } from "./useTaxiValidation";

type TaxiValidationMessageProps = {
    selectedRouteId?: number;
};

export const TaxiValidationMessage = (props: TaxiValidationMessageProps) => {
    const { selectedRouteId } = props;
    const { isTaxiValidationValid, taxiEnergyNeeded } = useTaxiValidation(selectedRouteId);
    return (
        <Box w="100%" textAlign="center" paddingTop="8">
            <Text>
                Taxi Validation {isTaxiValidationValid ? "OK" : "Failed"}
                {taxiEnergyNeeded && ` (${taxiEnergyNeeded.toFixed(2)} kWh needed)`}
            </Text>
        </Box>
    );
};
