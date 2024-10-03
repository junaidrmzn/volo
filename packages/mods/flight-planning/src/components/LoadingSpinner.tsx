import { Center, Spinner } from "@volocopter/design-library-react";

type LoadingSpinnerProps = {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export const LoadingSpinner = (props: LoadingSpinnerProps) => {
    const { size = "md" } = props;
    return (
        <Center boxSize="full">
            <Spinner size={size} />
        </Center>
    );
};
