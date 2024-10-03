import { Matchers } from "@pact-foundation/pact";
import { pactWith } from "jest-pact";
import type { PropsWithChildren } from "react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { I18nProvider } from "@voloiq/i18n";
import { ServiceProvider } from "@voloiq/service";
import { act, renderHook } from "@voloiq/testing";
import { CONSUMER_VOLOIQ_UI, PROVIDER_COMMERCIAL_SCHEDULING_API } from "../../../pactConstants";
import { CONNECTION_BASE_URL } from "../../../serviceEndpoints";
import { useUpdateConnection } from "../useUpdateConnection";
import { theConnection } from "./useCreateConnection.pacttest";

const { like } = Matchers;
pactWith({ consumer: CONSUMER_VOLOIQ_UI, provider: PROVIDER_COMMERCIAL_SCHEDULING_API }, (provider) => {
    test("will update a connection", async () => {
        const connectionId = "00000000-0000-0000-0000-000000000001";

        await provider.addInteraction({
            state: `connection updation with id ${connectionId}`,
            uponReceiving: "request to update a connection",
            withRequest: {
                path: `${CONNECTION_BASE_URL}/${connectionId}`,
                method: "PUT",
                body: theConnection,
            },
            willRespondWith: {
                status: 200,
                body: {
                    data: like(theConnection),
                },
            },
        });

        const { result, waitForNextUpdate } = renderHook(useUpdateConnection, {
            wrapper: (props: PropsWithChildren<{}>) => {
                const { children } = props;
                return (
                    <I18nProvider>
                        <LocalAuthenticationProvider>
                            <ServiceProvider baseUrl={provider.mockService.baseUrl}>{children}</ServiceProvider>
                        </LocalAuthenticationProvider>
                    </I18nProvider>
                );
            },
        });

        act(() => {
            result.current.sendRequestById(connectionId, { data: theConnection });
        });

        await waitForNextUpdate();
    });
});
