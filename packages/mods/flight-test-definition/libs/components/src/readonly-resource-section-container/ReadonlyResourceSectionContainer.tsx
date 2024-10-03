import { VStack } from "@volocopter/design-library-react";
import { SectionHeader } from "@voloiq/text-layouts";

export type ReadonlyResourceSectionContainerProps = {
    sectionTitle: string;
    children: React.ReactNode;
};

export const ReadonlyResourceSectionContainer = (props: ReadonlyResourceSectionContainerProps) => {
    const { children, sectionTitle } = props;

    return (
        <VStack spacing={6} boxSize="full" alignItems="stretch">
            <SectionHeader label={sectionTitle} />
            {children}
        </VStack>
    );
};
