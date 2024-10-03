import { Tabs } from "@volocopter/design-library-react";
import { ReactNode } from "react";

export type VerticalNavigationTabsProps = {
    size: "lg" | "md" | "sm";
    variant: "default" | "menu" | "underline";
    isLazy?: boolean;
    defaultIndex?: number;
    children: ReactNode;
    onChange?: (index: number) => void;
};

export const VerticalNavigationTabs = (props: VerticalNavigationTabsProps) => {
    const { size, variant, isLazy, defaultIndex, children, onChange } = props;

    return (
        <Tabs
            size={size}
            variant={variant}
            isLazy={isLazy}
            orientation="vertical"
            defaultIndex={defaultIndex}
            onChange={onChange}
        >
            {children}
        </Tabs>
    );
};
