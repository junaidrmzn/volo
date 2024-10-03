import { HStack, Icon, IconProps } from "@volocopter/design-library-react";
import { Children } from "react";

export type ItemsWithDivisionProps = {
    icon?: IconProps["icon"];
};

export const ItemsWithDivision: FCC<ItemsWithDivisionProps> = (props) => {
    const { icon = "minus", children } = props;

    const items = Children.toArray(children);

    if (items.length < 2 || items.length > 2) {
        throw new Error("ItemsWithDivision must have exactly 2 children");
    }

    const [leftItem, rightItem] = items;

    return (
        <HStack>
            {leftItem}
            <Icon aria-label={icon} size={3} icon={icon} />
            {rightItem}
        </HStack>
    );
};
