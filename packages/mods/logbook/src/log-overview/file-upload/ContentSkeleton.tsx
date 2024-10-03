import { Container, Skeleton } from "@volocopter/design-library-react";

export const ContentSkeleton = () => {
    return (
        <Container>
            <Skeleton mb={2} width="120px" height="24px" isLoading />
            <Skeleton mb={6} width="100%" height="40px" isLoading />
            <Skeleton mb={2} width="180px" height="24px" isLoading />
            <Skeleton mb={6} width="100%" height="80px" isLoading />
            <Skeleton float="right" mb={2} width="80px" height="40px" isLoading />
        </Container>
    );
};
