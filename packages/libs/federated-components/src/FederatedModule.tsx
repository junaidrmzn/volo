import { Center, Spinner } from "@volocopter/design-library-react";
import { TechnicalError } from "@voloiq/error-views";
import type { UseFederatedComponentOptions } from "./useFederatedComponent";
import { useFederatedComponent } from "./useFederatedComponent";

export type FederatedModuleProps = UseFederatedComponentOptions & {
    componentProps?: object;
};

export const FederatedModule = (props: FederatedModuleProps) => {
    const { componentProps } = props;
    const { FederatedComponent, errorLoading } = useFederatedComponent(props);

    if (FederatedComponent === null) {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }
    if (errorLoading) {
        return (
            <TechnicalError
                onTryAgainClick={() => {
                    window.location.reload();
                }}
            />
        );
    }
    return <FederatedComponent {...componentProps} />;
};
