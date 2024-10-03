import { Box, Text, VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import { EngineeringTestProcedure } from "@voloiq/flight-test-definition-api/v1";

export type EngineeringTestProcedureListItemProps = {
    engineeringTestProcedure: EngineeringTestProcedure;
};
export const EngineeringTestProcedureListItem = (props: EngineeringTestProcedureListItemProps) => {
    const { engineeringTestProcedure } = props;
    return (
        <VStack
            key={engineeringTestProcedure.id}
            width="100%"
            borderRadius="md"
            alignItems="flex-start"
            justifyContent="center"
            bg="decorative1Muted"
            p={3}
        >
            <Text textColor="fontOnBgBasic" fontWeight="semibold" lineHeight={6} fontSize="xs">
                {engineeringTestProcedure.title}
            </Text>
            <Box w="full" h="full" fontSize="xs">
                <EditorTextDisplay document={engineeringTestProcedure.details} />
            </Box>
        </VStack>
    );
};
