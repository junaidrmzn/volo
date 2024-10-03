import { Box, HStack, Skeleton } from "@volocopter/design-library-react";
import { ParameterFormLayout } from "./parameter-form-layout";
import { useParameterFormSchema } from "./useParameterFormSchema";

export type ParameterFormSkeletonProps = {
    withHeader?: boolean;
    withButtons?: boolean;
};

export const ParameterFormSkeleton = (props: ParameterFormSkeletonProps) => {
    const { withHeader = false, withButtons = false } = props;
    const schema = useParameterFormSchema({});
    const fieldCount = Object.keys(schema.fields).length;

    return (
        <ParameterFormLayout>
            {withHeader && (
                <ParameterFormLayout.Header>
                    <Skeleton height={6} isLoading mb={5} />
                    {withButtons && (
                        <HStack>
                            <Skeleton height={6} width={20} isLoading />
                            <Skeleton height={6} width={20} isLoading />
                        </HStack>
                    )}
                </ParameterFormLayout.Header>
            )}
            <ParameterFormLayout.AircraftField>
                <Skeleton height={4} width="10%" isLoading mb={2} />
                <Skeleton height={10} width="full" isLoading />
            </ParameterFormLayout.AircraftField>
            {Array.from({ length: fieldCount - 1 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <ParameterFormLayout.Field key={index}>
                    <Box mt={3}>
                        <Skeleton height={4} width="50%" isLoading mb={2} />
                        <Skeleton height={10} width="full" isLoading />
                    </Box>
                </ParameterFormLayout.Field>
            ))}
            <ParameterFormLayout.DescriptionField>
                <Skeleton height={4} isLoading mb={2} />
                <Skeleton height={20} width="80%" isLoading />
            </ParameterFormLayout.DescriptionField>
        </ParameterFormLayout>
    );
};
