import { CardList } from "@volocopter/design-library-react";
import React from "react";

export type ResourceListLayoutProps = {
    ariaLabel: string;
};

export const ResourceListLayout: FCC<ResourceListLayoutProps> = (props) => {
    const { ariaLabel, children } = props;

    return (
        <CardList aria-label={ariaLabel} w="full">
            {children}
        </CardList>
    );
};
