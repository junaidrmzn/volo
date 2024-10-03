import { Button, Icon, Wrap, WrapItem } from "@volocopter/design-library-react";
import { LinkedDefinitionType } from "@voloiq/flight-test-definition-api/v1";
import { useNavigate } from "@voloiq/routing";

type LinkedDefinitionsListingProps = {
    linkedDefinitions: LinkedDefinitionType[];
};

export const LinkedDefinitionsListing = (props: LinkedDefinitionsListingProps) => {
    const { linkedDefinitions } = props;
    const navigate = useNavigate();

    return (
        <Wrap>
            {linkedDefinitions.map((linkedDefinition) => (
                <WrapItem key={linkedDefinition.id}>
                    <Button
                        m={1}
                        p={0}
                        leftIcon={<Icon size={3.5} icon="link" />}
                        size="sm"
                        variant="link"
                        onClick={() => {
                            navigate(`../overview/${linkedDefinition.id}`);
                        }}
                    >
                        {linkedDefinition.ftdId}
                    </Button>
                </WrapItem>
            ))}
        </Wrap>
    );
};
