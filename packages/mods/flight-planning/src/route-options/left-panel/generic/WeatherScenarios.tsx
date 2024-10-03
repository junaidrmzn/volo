import { FormControl, HStack, Tag, useColorModeValue } from "@volocopter/design-library-react";
import { WeatherFields, WeatherTypes } from "@voloiq/flight-planning-api/v1";

type WeatherScenariosProps = {
    onScenarioChange: (weathertype: WeatherTypes) => void;
    selectedScenario: WeatherTypes;
};

export const WeatherScenarios = (props: WeatherScenariosProps) => {
    const { selectedScenario, onScenarioChange } = props;
    const white = useColorModeValue("white", "gray.800");
    const grey = useColorModeValue("gray.200", "gray.300");

    const handleTagClick = (type: WeatherTypes) => {
        onScenarioChange(type);
    };

    return (
        <FormControl>
            <HStack spacing={2}>
                {Object.keys(WeatherFields).map((key) => {
                    const scenario = WeatherFields[key as keyof typeof WeatherFields];
                    return (
                        <Tag
                            key={scenario}
                            colorScheme="gray-subtle"
                            fontStyle="normal"
                            backgroundColor={selectedScenario === scenario ? white : grey}
                            isSelected={selectedScenario === scenario}
                            onClick={() => handleTagClick(scenario)}
                        >
                            {scenario}
                        </Tag>
                    );
                })}
            </HStack>
        </FormControl>
    );
};
