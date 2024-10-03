import { Button, Center, Text, VStack } from "@volocopter/design-library-react";
import { useCounter } from "./useCounter";

export const ClickMe = () => {
    const { count, increment } = useCounter();
    return (
        <Center height="100vh" bg="green.700">
            <VStack>
                <Text>Welcome</Text>
                <Text> Click count: {count}</Text>
                <Button variant="primary" onClick={increment}>
                    Click ME
                </Button>
                <div>
                    <div>If you are new, here of helpful resource(s) below:</div>
                    <div>
                        <a href="https://confluence.volocopter.org/pages/viewpage.action?pageId=32081174">
                            Frontend Project Structure, Architecture, Coding Guideline
                        </a>
                    </div>
                </div>
            </VStack>
        </Center>
    );
};
