import { ServiceProvider } from "@voloiq/service";
import { ReactQueryClientProvider } from "../contexts/queryclient/ReactQueryContext";
import { mockedBaseUrl } from "./url";

export const TestingServiceProvider: FCC = (props) => {
    const { children } = props;
    return (
        <ServiceProvider baseUrl={mockedBaseUrl}>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ServiceProvider>
    );
};
