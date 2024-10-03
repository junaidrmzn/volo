import { Text } from "@volocopter/design-library-react";

export type ModalHeaderLayoutProps = {
    modalType: string;
    modalTitle: string;
};

export const ModalHeaderLayout = (props: ModalHeaderLayoutProps) => {
    const { modalType, modalTitle } = props;

    return (
        <Text fontSize="md" lineHeight={6} whiteSpace="nowrap">
            <Text
                as="span"
                fontSize="inherit"
                lineHeight="inherit"
                fontWeight="bold"
                textTransform="uppercase"
                whiteSpace="nowrap"
            >
                {modalType}
            </Text>{" "}
            <Text as="span" fontSize="inherit" lineHeight="inherit" fontWeight="light" whiteSpace="nowrap">
                {modalTitle}
            </Text>
        </Text>
    );
};
