import { TabList } from "@volocopter/design-library-react";
import { ReactNode } from "react";

export type VerticalNavigationTabListProps = {
    children: ReactNode;
};

export const VerticalNavigationTabList = (props: VerticalNavigationTabListProps) => {
    const { children } = props;
    return <TabList>{children}</TabList>;
};
