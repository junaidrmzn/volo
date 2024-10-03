import { Box, HStack, Icon, Spacer } from "@volocopter/design-library-react";
import type { ActionsButtonProps } from "./ActionsButton";
import { ActionsButton } from "./ActionsButton";
import type { FileDescriptionProps } from "./FileDescription";
import { FileDescription } from "./FileDescription";

export type FileCardProps = ActionsButtonProps & FileDescriptionProps & { isReadonly?: boolean };
export const FileCard = (props: FileCardProps) => {
    const { isUploading, isReadonly = false } = props;
    return (
        <Box padding={3} borderRadius="sm" background="gray100Gray900">
            <HStack spacing={3} alignItems="flex-start">
                <Icon size={8} margin={3} icon="file" />
                <FileDescription {...props} />
                <Spacer />
                {!isUploading && !isReadonly && <ActionsButton {...props} />}
            </HStack>
        </Box>
    );
};
