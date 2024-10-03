import { HStack, Icon, List, ListItem, Text } from "@volocopter/design-library-react";

export type BookingManagementListProps = {
    list: string[];
};

export const BookingManagementList: FCC<BookingManagementListProps> = (props) => {
    const { list, children } = props;

    return (
        <>
            {children}
            <List pl={3}>
                {list.map((policy: string) => (
                    <ListItem key={policy}>
                        <HStack spacing={3}>
                            <Icon icon="dot" size={0.5} />
                            <Text fontSize="sm">{policy}</Text>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </>
    );
};
