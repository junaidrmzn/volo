import { Box } from "@volocopter/design-library-react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export type ExpandableSelectableCardContentProps = {
    isOpen: boolean;
    children: ReactNode;
};

export const ExpandableSelectableCardContent = (props: ExpandableSelectableCardContentProps) => {
    const { isOpen, children } = props;

    return (
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
                >
                    <Box mt={1} py={1}>
                        {children}
                    </Box>
                </motion.section>
            )}
        </AnimatePresence>
    );
};
