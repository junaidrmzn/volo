import { VStack } from "@volocopter/design-library-react";
import { ManualRequirementsSection } from "./manual-requirements-section/ManualRequirementsSection";
import { WindchillRequirementsSection } from "./windchill-requirements-section/WindchillRequirementsSection";

export const Requirements = () => {
    return (
        <VStack spacing={6} alignItems="stretch">
            <ManualRequirementsSection />
            <WindchillRequirementsSection />
        </VStack>
    );
};
