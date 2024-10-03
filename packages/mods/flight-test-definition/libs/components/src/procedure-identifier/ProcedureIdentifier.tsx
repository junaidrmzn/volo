import { Box, HStack, Spacer, Text } from "@volocopter/design-library-react";
import type { StatusTagProps } from "../status-badge/StatusTag";
import { StatusTag } from "../status-badge/StatusTag";
import { useProcedureIdentifierTranslation } from "./translations/useProcedureIdentifierTranslation";

export type ProcedureIdentifierProps = {
    title: string;
    procedureId: string;
    testPointCount: number;
    procedureIndex: number;
} & Pick<StatusTagProps, "status">;

export const ProcedureIdentifier = (props: ProcedureIdentifierProps) => {
    const { procedureId, status, testPointCount, title, procedureIndex } = props;
    const { t } = useProcedureIdentifierTranslation();

    return (
        <HStack>
            <Box>
                <Text fontSize="sm" lineHeight={6} fontWeight="bold" as="span">
                    {procedureIndex} · {procedureId} -
                </Text>
                &nbsp;
                <Text fontSize="sm" lineHeight={6} as="span">
                    {title}
                </Text>
            </Box>
            <StatusTag status={status} />
            <Spacer />
            <Text fontSize="sm" lineHeight={6}>
                {testPointCount === 1
                    ? t("1 Testpoint")
                    : t("{numberOfTestpoints} Testpoints", { numberOfTestpoints: testPointCount })}
            </Text>
        </HStack>
    );
};
