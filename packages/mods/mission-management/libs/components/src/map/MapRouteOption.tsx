import { Box, Button, Flex, Spacer, VStack, useDisclosure } from "@volocopter/design-library-react";
import { AnimatePresence, motion } from "framer-motion";
import { FederatedMapRouteOption } from "../microfrontends";
import { useMapTranslation } from "./translations/useMapTranslation";

export type MapRouteOptionProps = {
    routeOptionId: string;
    isInitiallyShown?: boolean;
};

export const MapRouteOption = (props: MapRouteOptionProps) => {
    const { routeOptionId, isInitiallyShown = false } = props;
    const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: isInitiallyShown });
    const { t } = useMapTranslation();

    return (
        <VStack alignItems="stretch">
            <Flex>
                <Spacer />
                <Button onClick={onToggle} variant="ghost" size="sm">
                    {isOpen ? t("Hide Map") : t("Show Map")}
                </Button>
            </Flex>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                    >
                        <Box h={100} w="100%">
                            <FederatedMapRouteOption routeOptionId={routeOptionId} />
                        </Box>
                    </motion.section>
                )}
            </AnimatePresence>
        </VStack>
    );
};
