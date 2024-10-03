import { HStack, VStack } from "@volocopter/design-library-react";
import { ReactNode } from "react";
import { SectionHeader } from "@voloiq/text-layouts";

export type SubSectionProps = {
    headerLabel?: string;
    bodyContent: ReactNode;
};

export const SubSection = (props: SubSectionProps) => {
    const { headerLabel, bodyContent } = props;

    return (
        <HStack bg="bgContentLayer" width="100%" borderRadius="sm" py={3} px={4.5}>
            <VStack width="100%">
                {headerLabel && <SectionHeader label={headerLabel} />}
                <VStack width="100%" alignItems="flex-start" spacing={3}>
                    {bodyContent}
                </VStack>
            </VStack>
        </HStack>
    );
};
