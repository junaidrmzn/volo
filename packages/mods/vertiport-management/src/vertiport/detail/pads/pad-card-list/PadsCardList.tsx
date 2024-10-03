import { SimpleGrid, VStack } from "@volocopter/design-library-react";
import { SectionHeader } from "@voloiq/text-layouts";
import type { Pad, Vertiport } from "@voloiq/vertiport-management-api/v1";
import { PadCard } from "./PadCard";
import { ActionsPopover } from "./pad-actions-popover/ActionsPopover";
import { ActionsPopoverProvider } from "./pad-actions-popover/popover-context/ActionsPopoverProvider";

type PadsCardListProps = {
    pads: Pad[];
    vertiport: Vertiport;
};

export const PadsCardList = (props: PadsCardListProps) => {
    const { pads, vertiport } = props;

    return (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} rowGap={3}>
            {pads.map((pad) => (
                <VStack
                    key={pad.id}
                    spacing={3}
                    alignItems="stretch"
                    bg={pad?.validTo && new Date(pad?.validTo) < new Date() ? "decorative1Emphasized" : "unset"}
                    p={3}
                    m={2}
                    borderRadius={8}
                >
                    <SectionHeader label={pad.padKey}>
                        <ActionsPopoverProvider>
                            <ActionsPopover pad={pad} vertiport={vertiport} />
                        </ActionsPopoverProvider>
                    </SectionHeader>
                    <PadCard key={pad.id} pad={pad} />
                </VStack>
            ))}
        </SimpleGrid>
    );
};
