import { Box, HStack, useColorModeValue } from "@volocopter/design-library-react";
import type { FlightPathItem } from "@voloiq-typescript-api/flight-monitoring-types";
import { ReactECharts } from "./ReactEChart";
import { option } from "./ReactEChartsOption";

type VerticalProfileProps = {
    data: (FlightPathItem & { distance: number })[];
};

export const VerticalProfile = (props: VerticalProfileProps) => {
    const { data } = props;
    const bgColor = useColorModeValue("white", "gray.900");

    return (
        <HStack
            w="100%"
            h="100%"
            bgColor={bgColor}
            boxShadow="lg"
            borderRadius="lg"
            data-testid="flight-monitoring-vertical-profile"
        >
            <Box w="100%" h="100%" data-testid="vertical-profile">
                <ReactECharts
                    option={{
                        ...option,
                        series: [
                            {
                                data: data.map((item) => [
                                    item.distance,
                                    data[0] ? Math.round((item.alt! - data[0]?.alt!) * 3.280_84) : 0,
                                ]),
                                type: "line",
                                symbol: "none",
                            },
                        ],
                    }}
                    style={{ height: "100%" }}
                />
            </Box>
        </HStack>
    );
};
