import { Icon } from "@volocopter/design-library-react";
import { motion } from "framer-motion";

export type ExpandableSelectableCardChevronIconProps = {
    isOpen: boolean;
};

export const ExpandableSelectableCardChevronIcon = (props: ExpandableSelectableCardChevronIconProps) => {
    const { isOpen } = props;

    return (
        <motion.span
            animate={isOpen ? "open" : "collapsed"}
            variants={{
                open: { rotate: 180 },
                collapsed: { rotate: 0 },
            }}
            transition={{ duration: 0.3 }}
        >
            <Icon icon="chevronDown" size={4} color="blue300Mono650" />
        </motion.span>
    );
};
