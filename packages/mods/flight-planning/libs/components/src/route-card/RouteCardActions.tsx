import { VStack } from "@volocopter/design-library-react";
import { RouteMenu } from "./RouteMenu";

export const RouteCardActions = () => {
    return (
        <VStack justifyContent="space-between">
            <RouteMenu />
        </VStack>
    );
};
