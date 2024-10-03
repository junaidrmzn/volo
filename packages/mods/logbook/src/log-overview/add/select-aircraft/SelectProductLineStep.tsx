import type { PictogramName } from "@volocopter/design-library-react";
import { Card, HStack, Pictogram, SimpleGrid, Text } from "@volocopter/design-library-react";
import { useStepsContext } from "@volocopter/steps-react";
import { useEffect } from "react";

export type ProductLine = "VoloRegion" | "VoloDrone";

type SelectProductLineStepProps = {
    selectedProductLine: ProductLine;
    onChange: (selectedAircraft: ProductLine) => void;
};

export const SelectProductLineStep = (props: SelectProductLineStepProps) => {
    const { selectedProductLine, onChange } = props;
    const { setIsNextStepEnabled } = useStepsContext();
    const entries: Record<ProductLine, PictogramName> = {
        VoloRegion: "voloregion",
        VoloDrone: "volodrone",
    };

    // eslint-disable-next-line use-encapsulation/prefer-custom-hooks
    useEffect(() => {
        setIsNextStepEnabled(true);
    });

    return (
        <SimpleGrid columns={2} spacing={4} w="full">
            {Object.entries(entries).map(([label, pictogram]) => (
                <Card
                    key={label}
                    variant="subtle"
                    isSelected={selectedProductLine === label}
                    onClick={() => onChange(label as ProductLine)}
                    ariaLabel={label}
                >
                    <HStack spacing={4}>
                        <Pictogram pictogram={pictogram} />
                        <Text fontSize="lg" fontWeight={selectedProductLine === label ? "bold" : "normal"}>
                            {label}
                        </Text>
                    </HStack>
                </Card>
            ))}
        </SimpleGrid>
    );
};
